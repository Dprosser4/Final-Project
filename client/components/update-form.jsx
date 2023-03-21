import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import AppContext from '../lib/app-context';
import ImageModal from './image-modal';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function UpdateForm({ project, onSave, onCancel }) {
  const [projectImages, setProjectImages] = useState([]);
  const [poNumber, setPoNumber] = useState(project.poNumber);
  const [name, setName] = useState(project.name);
  const [address, setAddress] = useState(project.address);
  const [city, setCity] = useState(project.city);
  const [state, setState] = useState(project.state);
  const [zipcode, setZipcode] = useState(project.zipcode);
  const [notes, setNotes] = useState(project.notes);
  const [completed, setCompleted] = useState(project.completed);
  const [assignedTo, setAssignedTo] = useState(project.assignedTo);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    fetch(`/api/images/${project.projectId}`)
      .then((response) => response.json())
      .then((data) => setProjectImages(data))
      .catch((error) => { console.error('Error:', error); });
    setShow(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ poNumber, name, address, city, state, zipcode, notes, completed, assignedTo })
    };
    fetch(`/api/projects/${project.projectId}`, req)

      .then((res) => res.json())
      .then((res) => {
        if (res.error === 'duplicate') {
          setError(true);
        } else {
          onSave();
          return res;
        }
      })
      .catch((error) => { console.error('Error:', error); });
  }
  const { techs } = useContext(AppContext);

  return (

    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10 align-items-center text-align-center">
      <div className='text-center'>
        <h2 className="fs-4">
          Project Update
        </h2>
      </div>
      {show &&
        <ImageModal projectImages={projectImages} project={project} show={show} handleClose={handleClose} />
      }
      <Form onSubmit={handleSubmit}>

        <Form.Group className='mb-3' controlId="formPoNumber">
          <Form.Label>PO Number:</Form.Label>
          <Form.Control
              type="text"
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              isInvalid = {!!error}
              required
            />
          <Form.Control.Feedback type="invalid">
            PO Number already exists! Try Another
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group className='mb-3' controlId="formAddress">
          <Form.Label>Address:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group className='mb-3' controlId="formCity">
          <Form.Label>City:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group className='mb-3' controlId="formState">
          <Form.Label>State:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group className='mb-3' controlId="formZipcode">
          <Form.Label>Zipcode:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter Zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
        </Form.Group>

        <Form.Group className='mb-3' controlId="formCompleted">
          <Form.Label>Assigned To:</Form.Label>
          <Form.Control
              as="select"
              value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
              >
            <option value="unassigned">Not Assigned Yet</option>
            {techs.map((tech) => (<option key={tech.userId} value={tech.userId} >{`${tech.firstName} ${tech.lastName}`}</option>))}

          </Form.Control>

        </Form.Group>

        <Form.Group className='mb-3' controlId="formNotes">
          <Form.Label>Notes:</Form.Label>
          <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
        </Form.Group>

        <Button variant="primary" onClick={handleShow}>
          Add/View Images
        </Button>

        <Form.Group className='mb-3' controlId="formCompleted">
          <Form.Label>Completed:</Form.Label>
          <Form.Check
            type='checkbox'
            checked={completed}
            onChange={(e) => setCompleted(!completed)}
          />
        </Form.Group>

        <Button variant="primary" type='submit'>
          Update
        </Button>
        <Button onClick={onCancel} className='ms-2' variant='danger'>Cancel</Button>
      </Form>
    </div>
  );
}
