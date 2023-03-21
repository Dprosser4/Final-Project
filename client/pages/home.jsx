import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import { Col } from 'react-bootstrap';

export default function Home() {
  const { user } = useContext(AppContext);
  if (!user) return <Redirect to="sign-in" />;

  return (

    <Col className="col-lg-4 text-center">
      <h2 className="fs-4">
        Welcome {`${user.firstName}!`}
      </h2>
      <p className="text-muted mb-4">Protrak2 is a project mangement app for creating, updating and completion tracking of projects. Admin Users can create and update projects, assign projects to the technicians, and view when those projects are completed. Technicians can only see projects assigned to them, update notes, add images and mark a project as complete. Use the Navigation Bar above to try it out!</p>
    </Col>
  );
}
