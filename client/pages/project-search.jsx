import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import UpdateForm from '../components/update-form';
import ProjectsAccordian from '../components/project-accordian';
import { ScaleLoader } from 'react-spinners';
import { Button, Form, InputGroup } from 'react-bootstrap';

export default function ProjectSearch() {
  const [projects, setProjects] = useState([]);
  const [updateProject, setUpdateProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [queryProjects, setQueryProjects] = useState([]);
  const [poNumber, setPoNumber] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [queryMessage, setQueryMessage] = useState('Search for projects with the tools above.');
  const [projectStatus, setProjectStatus] = useState([]);
  const { techs } = useContext(AppContext);

  function handleUpdateClick(project) {
    setUpdateProject(project);
  }

  function onSave() {
    setUpdateProject(null);
  }

  function onCancel() {
    setUpdateProject(null);
  }

  useEffect(() => {
    fetch('/api/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((error) => { console.error('Error:', error); });
  }, [updateProject]);

  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  if (updateProject) {
    return (<UpdateForm project={updateProject} onSave={onSave} onCancel={onCancel} />);
  }

  if (isLoading) {
    return (<div className='d-flex mt-5 justify-content-center'>
      <ScaleLoader color="#136EFD" />
    </div>);
  }

  const completedProjects = projects.filter((project) => project.completed);
  const unassignedProjects = projects.filter((project) => project.assignedTo === null && !project.completed);
  const assignedProjects = projects.filter((project) => project.assignedTo && !project.completed);

  function searchByPoNumber() {
    setQueryProjects(projects.filter((project) => project.poNumber === poNumber));
    if (queryProjects.length === 0) {
      setQueryMessage('No Project Found with that PO Number. Reminder PO Numbers are case sensetive and must be exact match.');
    }
  }

  function searchByTechnician() {
    setQueryProjects(projects.filter((project) => String(project.assignedTo) === assignedTo));
    if (queryProjects.length === 0) {
      setQueryMessage('No Projects Assigned To That Technician');
    }
  }

  function searchByStatus(e) {
    if (projectStatus === 'allprojects') {
      setQueryProjects(projects);
    }
    if (projectStatus === 'assigned') {
      setQueryProjects(assignedProjects);
    }
    if (projectStatus === 'unassigned') {
      setQueryProjects(unassignedProjects);
    }
    if (projectStatus === 'completed') {
      setQueryProjects(completedProjects);
    }
    if (queryProjects.length === 0) {
      setQueryMessage('No projects found with that status.');
    }
  }

  return (
    <div className="col-lg-4 text-align-center">
      <Form onSubmit={searchByPoNumber}>
        <Form.Label>Search By PO Number:</Form.Label>
        <InputGroup className='mb-3' controlId="formPoNumber">
          <Form.Control
            type="text"
            placeholder="Enter PO Number e.g. PT12345"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            required
          />
          <Button type='submit' variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>

      <Form onSubmit={searchByTechnician}>
        <Form.Label>Search By Technician:</Form.Label>
        <InputGroup className='mb-3' controlId="formAssigned">
          <Form.Select value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)} >

            <option value="unassigned">Choose a Technician</option>
            {techs.map((tech) => (<option key={tech.userId} value={tech.userId} >{`${tech.firstName} ${tech.lastName}`}</option>))}

          </Form.Select>
          <Button type='submit' variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>

      <Form onSubmit={searchByStatus}>
        <Form.Label>Search By Project Status:</Form.Label>
        <InputGroup className='mb-3' controlId="formStatus">
          <Form.Select value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)} >

            <option value='allprojects'>All Projects </option>
            <option value='unassigned'>Unassigned Projects </option>
            <option value='assigned'>Assigned Projects </option>
            <option value='completed'>Completed Projects </option>

          </Form.Select>
          <Button type='submit' variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>

      <h2 className="text-center mt-3 fs-4">
        Projects:
      </h2>
      <ProjectsAccordian projects={queryProjects} handleUpdateClick={handleUpdateClick} />
      {queryProjects.length === 0 &&
      <p className='text-center'> {queryMessage}</p>
        }
    </div>
  );
}
