require('dotenv/config');
const s3 = require('./s3');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());
app.use(staticMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password, role, firstName, lastName } = req.body;
  if (!username || !password || !role || !firstName || !lastName) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then((hashedPassword) => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "role", "firstName", "lastName")
        values ($1, $2, $3, $4, $5)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword, role, firstName, lastName];
      return db.query(sql, params);
    })
    .then((result) => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch((err) => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword",
           "role",
           "firstName",
           "lastName"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then((result) => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword, role, firstName, lastName } = user;
      return argon2
        .verify(hashedPassword, password)
        .then((isMatching) => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username, role, firstName, lastName };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch((err) => next(err));
});

app.get('/api/projects/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new ClientError(400, 'invalid projectId');
  }
  const sql = `
    select *
    from "projects"
    where "projectId" = $1
  `;
  const params = [projectId];
  db.query(sql, params)
    .then((result) => {
      const project = result.rows[0];
      if (!project) {
        throw new ClientError(404, 'Project Does not exist');
      }
      res.status(200).json(project);
    })
    .catch((err) => next(err));
});

app.get('/api/projects/assigned/:userId', (req, res, next) => {
  const assignedTo = Number(req.params.userId);
  if (!Number.isInteger(assignedTo) || assignedTo <= 0) {
    throw new ClientError(400, 'invalid userId');
  }
  const sql = `
    select *
    from "projects"
    where "assignedTo" = $1
    order by "createdAt" desc
  `;
  const params = [assignedTo];
  db.query(sql, params)
    .then((result) => {
      const project = result.rows;
      res.status(200).json(project);
    })
    .catch((err) => next(err));
});

app.post('/api/projects', (req, res, next) => {
  const { poNumber, name, address, city, state, zipcode, notes } = req.body;
  if (!poNumber || !name || !address || !city || !state || !zipcode) {
    res.status(400).json({
      error: 'poNumber, name, address, city, state, zipcode are required fields'
    });
    return;
  }
  const sql = `
    insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode", "notes")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [poNumber, name, address, city, state, zipcode, notes];
  db.query(sql, params)
    .then((result) => {
      const [project] = result.rows;
      res.status(201).json(project);
    })
    .catch((err) => next(err));
});

app.get('/api/projects', (req, res, next) => {
  const sql = `
    select *
    from "projects"
    order by "createdAt" desc
  `;
  db.query(sql)
    .then((result) => {
      const projects = result.rows;
      res.status(200).json(projects);
    })
    .catch((err) => next(err));
});

app.put('/api/projects/:projectId', (req, res, next) => {
  let { poNumber, name, address, city, state, zipcode, notes, completed, assignedTo, completedDate } = req.body;
  const projectId = Number(req.params.projectId);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new ClientError(400, 'invalid projectId');
  }
  assignedTo = Number(assignedTo);
  if (!Number.isInteger(assignedTo) || assignedTo === 0) {
    assignedTo = null;
  }
  const sql = `
    update "projects"
    set "poNumber" = $2, "name" = $3, "address" = $4, "city" = $5, "state" = $6, "zipcode" = $7, "notes" = $8, "completed" = $9, "assignedTo" = $10, "dateCompleted" = $11
    where "projectId" = $1
    returning *
  `;
  const params = [projectId, poNumber, name, address, city, state, zipcode, notes, completed, assignedTo, completedDate];

  db.query(sql, params)
    .then((result) => {
      const project = result.rows[0];
      if (!project) {
        throw new ClientError(404, 'Project Does not exist');
      }
      res.status(200).json(project);
    })
    .catch((err) => next(err));
});

app.get('/api/users/techs', (req, res, next) => {
  const sql = `
    select "userId", "firstName", "lastName"
    from "users"
    where "role" = 'tech'
    order by "firstName"
  `;
  db.query(sql)
    .then((result) => {
      const projects = result.rows;
      res.status(200).json(projects);
    })
    .catch((err) => next(err));
});

app.get('/api/users', (req, res, next) => {
  const sql = `
    select "username", "firstName", "lastName", "role"
    from "users"
    order by "role"
  `;
  db.query(sql)
    .then((result) => {
      const projects = result.rows;
      res.status(200).json(projects);
    })
    .catch((err) => next(err));
});

app.get('/s3Url', async (req, res) => {
  const url = await s3.generateUploadURL();
  res.send({ url });
});

app.post('/api/images', (req, res, next) => {
  const { imageUrl, projectId } = req.body;
  if (!imageUrl || !projectId) {
    res.status(400).json({
      error: 'imageUrl, and projectId are required fields'
    });
    return;
  }
  const sql = `
    insert into "images" ("url","project")
    values ($1, $2)
    returning *
  `;
  const params = [imageUrl, projectId];
  db.query(sql, params)
    .then((result) => {
      const [image] = result.rows;
      res.status(201).json(image);
    })
    .catch((err) => next(err));
});

app.get('/api/images/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new ClientError(400, 'invalid projectId');
  }
  const sql = `
    select *
    from "images"
    where "project" = $1
    order by "imageId" desc
  `;
  const params = [projectId];
  db.query(sql, params)
    .then((result) => {
      const project = result.rows;
      res.status(200).json(project);
    })
    .catch((err) => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
