import React, { useState, useContext } from 'react'
import * as ReactDOM from 'react-dom';
import './events.css';
import { Event } from './events-model';
// import { DataContext } from '../../contexts/data-context';
// // import Button from 'react-bootstrap/Button';
// import { Container, Collapse, NavItem, NavLink} from 'react-bootstrap';
// import {NavbarToggler}from 'react-strap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

interface NavMenuState {
    collapsed: boolean;
}
interface eventProps {
    eventName: any,
    startDate: any,
    endDate: Date,
    sendDate: Date,
}
interface Istate {
    open: boolean
}



const [toggleState, setToggleState] = useState<NavMenuState>({ collapsed: true });


export const EventsPage: React.FunctionComponent = (eventProps,Istate) => {

    return (
        <div className="App">
            <h1> Events </h1>
            <b>
                You are invited to write a message for these following events!
            </b>
            <Container>
                <NavbarToggler onClick={() => { setToggleState({ collapsed: !toggleState }) }} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!toggleState} navbar>
                    <ul className="navbar-nav-flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="Message">ASB Chritmas 2019</NavLink>
                        </NavItem>
                    </ul>
                </Collapse> 
            </Container>
        </div >
    );
}


                /* <Row className ="show-grid">
                    <Row className ="dark-back pad">
                        <Col md={15}>
                            <div>
                                <b>
                                    2019 ASB Christmas 
                                </b>
                                <b>
                                    2020 ASB NewYear
                                </b>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>
            </div> */


/* <Container>
    <NavbarBrand tag={Link} to="/">ECard</NavbarBrand>
    <NavbarToggler onClick={() => { setToggleState({ collapsed: !toggleState }) }} className="mr-2" />
    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!toggleState} navbar>
        <ul className="navbar-nav flex-grow">
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/events">Events</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/AddContact">Contact</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/message">Message</NavLink>
            </NavItem>
        </ul>
    </Collapse>
</Container> */



export default EventsPage;
