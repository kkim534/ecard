import React from 'react';
import { Nav,NavbarBrand} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imagejpg from './../../../assets/Ecardimage.png';
import './NavMenu.css';


export const NavMenu: React.FunctionComponent = (props: any) => {
  return (
    <Nav id="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">

          <img className="logo" src="/logo.PNG" alt="datacom logo"/>

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
            <Nav.Link as={Link} to="/event" className="nav-item-text">Events</Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/message/1" className="nav-item-text">Organisation</Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/organisation" className="nav-item-text">Create Organisation</Nav.Link>
          </li>
          <li className="menuitem-alignments">
            <Nav.Link as={Link} to="/export" className="nav-item-text">Export</Nav.Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div><img className="sidebar-image" src={imagejpg} /></div>

          <div>
            &copy; {new Date().getFullYear()} Copyright <a href="https://www.datacom.co.nz/"> Datacom</a>
          </div>
        </div>
      </div>
    </Nav>
  );
}
