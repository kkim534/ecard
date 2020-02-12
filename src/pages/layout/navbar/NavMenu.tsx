import React from 'react';
import { Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';


export const NavMenu: React.FunctionComponent = (props: any) => {
  return (
    <Nav id="sidebar">
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
            <Nav.Link as={Link} to="/organisation" className="nav-item-text">Create organisation</Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/export" className="nav-item-text">Export</Nav.Link>
          </li>
        </ul>

        <div className="sidebar-footer">
            &copy; {new Date().getFullYear()} Copyright <a href="https://www.datacom.co.nz/"> Datacom</a>
        </div>
      </div>
    </Nav>
  );
}
