import 'react-dates/initialize';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';
import "./home.css";


export default React.PureComponent;

export const Home: React.FunctionComponent = () => {

    const initialStateValue = [{ id: 0, name: "", details: "", endDate: "", image: "" }];
    const [EventList, setEventList] = useState(initialStateValue);
    useEffect(() => {
        if (EventList.length === 1) {
            fetch('https://datacomecarduat.azurewebsites.net/api/Events', {
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
        <Container fluid id="home-container">
            <h3>Datacom E-Card</h3>
            <p>TODO List: 1. This page is not responsive, designed for 1440 x 635 resolution. Add Media Queries for other resolutions.(https://www.w3schools.com/css/css_rwd_mediaqueries.asp) 2.Need short description about ecard portal(ex: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make)</p>
            <Row id="card-layout">
                {
                    EventList.map(event =>
                        <Col sm >
                            <Card className="card-alignments">
                                <div className="card-img-alignments" >
                                    <Card.Img variant="top" src={event.image} />
                                </div>

                                <Card.Body>
                                    <Card.Title>{event.name}</Card.Title>
                                    <Card.Text>End Date: {event.endDate}</Card.Text>
                                    <Card.Text className="card-details-text">{event.details}</Card.Text>
                                    <Button variant="primary">Greeting</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    )
                }
            </Row>
        </Container>
    );

}