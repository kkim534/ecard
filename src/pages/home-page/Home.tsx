import 'react-dates/initialize';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom';
import 'react-dates/lib/css/_datepicker.css';
import "./home.css";


export default React.PureComponent;

export const Home: React.FunctionComponent = () => {
    const initialStateValue = [{ id: 0, name: "", details: "", endDate: "", image: "" }];
    const [EventList, setEventList] = useState(initialStateValue);

    useEffect(() => {
        if (EventList.length === 1) {
            fetch('https://datacomecarduat.azurewebsites.net/api/Events/', {
                headers: {
                    "ApiKey": "99d73981-632e-4aa7-8499-169e5da08ef3"
                }
            })
                .then(response => response.json())
                .then(data => {
                    setEventList(data);
                });
        }
    }, [EventList]);

    return (
        <>
            <Container fluid id="home-container">
                <Row noGutters className="heading-container">
                    <Col>
                        <h1>Events</h1>
                    </Col>
                </Row>

                <Row noGutters className="content" id="card-layout">
                    {
                        EventList.map(event =>
                            <Col key={event.id} sm className="card-alignments">
                                <Card>
                                    <div className="card-img-alignments" >
                                        <Card.Img variant="top" src={event.image} />
                                    </div>

                                    <Card.Body>
                                        <Card.Title>{event.name}</Card.Title>
                                        <Card.Text>Due date: {event.endDate.substring(0,10)}</Card.Text>
                                        <Card.Text className="card-details-text">{event.details}</Card.Text>

                                        <NavLink tag={Link} className="text-dark" to={`message/${event.id}`}>
                                            <Button className="no-margin" variant="primary">Write a message</Button>
                                        </NavLink>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </>
    );
}