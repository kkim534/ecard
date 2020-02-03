import React, {  useState,constructor, Component } from 'react';
import { Nav,NavbarBrand,Button,Navbar,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export interface NavMenuState {
  collapsed: boolean;
}

export const NavMenu: React.FunctionComponent = () => {

  const [toggleState, setToggleState] = useState<NavMenuState>({ collapsed: true});
  return (
    <div className="wrapper">
      <Nav className = "col-sm-3" id="sidebar">
        <div className="sidebar-content">
        <div className="sidebar-header">
          <NavbarBrand as={Link} to="/"><img className="logo" src="/logo.PNG" alt="datacom logo" /></NavbarBrand>
        </div>
        <ul className="components">
          <li className="header-category-text">
            <span>General</span>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/" className="nav-item-text">
              <span>Home</span>
            </Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/contact" className="nav-item-text">Contact</Nav.Link>
          </li>
          <hr />
          <li className="header-category-text">
            <span>Admin</span>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/event" className="nav-item-text">Create event</Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/message/1" className="nav-item-text">Organisation</Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/organisation" className="nav-item-text">Create organisation</Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/export" className="nav-item-text">Export</Nav.Link>
          </li>
        </ul>
         
      <div className="sidebar-footer">
        <div>
          &copy; {new Date().getFullYear()} Copyright <a href="https://www.datacom.co.nz/"> Datacom</a>
        </div>
      </div>
      </div>
        </Nav>
     <Navbar className ="navbar-expand-sm navbar-toggleable-sm ng white border-bottom box-shadow mb-3" >
       <Container>
      <div id="content">
        {/* <Nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
              <i className="fas fa-align-left"></i>
              <span>Toggle</span>
            </button>
            {/* <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-align-justify"></i>
            // </button> */}
            {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}

            </div>
            {/* </Nav> */}
          </div>
      {/* </div> */}
      </Container>
    </Navbar>
    </div>
   
  );
}


