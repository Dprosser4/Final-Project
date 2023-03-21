import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from '../lib/app-context';

export default function NavbarMain() {
  const { user, handleSignOut } = useContext(AppContext);
  return (
    <div>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">            <img
            src="/images/Protrak2-logo.png"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {!user &&
              <Nav.Link href="#sign-in">Login</Nav.Link>
              }
              {user &&
              <>
                {user.role === 'admin' &&
                  <>
                    <Nav.Link href="#projects">Projects</Nav.Link>
                    <Nav.Link href="#newproject">Create Project</Nav.Link>
                    <Nav.Link href="#projectsearch">Project Search</Nav.Link>
                    <Nav.Link href="#manageusers">Manage Users</Nav.Link>
                  </>
                }
                {user.role === 'tech' &&
                  <Nav.Link href="#techprojects">My Projects</Nav.Link>
                }

                <Nav.Link onClick={handleSignOut}>Log Out</Nav.Link>
              </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
