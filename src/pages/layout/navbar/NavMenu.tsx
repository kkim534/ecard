import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';


export const NavMenu: React.FunctionComponent = (props: any) => {
  return (
    <Navbar bg="light" expand="lg" className="nav-alignments navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
      <Navbar.Brand as={Link} to="/"><img className="logo" src="/logo.PNG" alt="datacom logo"/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <NavDropdown title="Admin" id="basic-nav-dropdown" alignRight>
            <NavDropdown.Item as={Link} to="/event">Events</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/message/1">Organisation</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="export">Export</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
