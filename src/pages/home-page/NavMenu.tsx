import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
export interface NavMenuState {
  collapsed: boolean;
}

export const NavMenu: React.FunctionComponent = (props: any) => {

  const [toggleState, setToggleState] = useState<NavMenuState>({ collapsed: true });

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <NavbarBrand tag={Link} to="/"><img className="logo" src="/logo.PNG" /></NavbarBrand>
        <NavbarToggler onClick={() => { setToggleState({ collapsed: !toggleState }) }} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!toggleState} navbar>
          <Nav className="navbar-nav flex-grow" navbar>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/events">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/addContact">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/message">Message</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} className="text-dark" to="/events">
                  Create Events
                </DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/organization">
                  Create Organization
                </DropdownItem>
                <DropdownItem tag={Link} className="text-dark" to="/export">
                  Export
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}
