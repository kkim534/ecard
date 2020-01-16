import React, { useState, useContext } from 'react'
import * as ReactDOM from 'react-dom';
import './events.css';
import { Event } from './events-model';
// import { DataContext } from '../../contexts/data-context';
// // import Button from 'react-bootstrap/Button';
import {Row, Container, Col} from 'react-bootstrap';

interface eventProps {
    eventName: any,
    startDate: any,
    endDate: Date,
    sendDate: Date,
}
interface Istate {
    open: boolean
}




export const EventsPage: React.FunctionComponent = (props: any) => {

    return (
        <div className="App">
            <h1> Events </h1>
            <b>
                You are invited to write a message for these following events!
            </b>
            <Container>
                <Row className ="show-grid">
                    <Row className ="dark-back pad">
                        <Col md={15}>
                            <div>
                                <b>
                                    2019 ASB Christmas
                                </b>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>
            </div>
    );
}



export default EventsPage;
