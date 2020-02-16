import React, { useState, useEffect } from 'react';
import './message.css';
import { Form, Col, Button, Row, Container } from 'react-bootstrap';
import { useParams } from "react-router";

export const MessagePage: React.FunctionComponent = (props: any) => {

    const initialState = [{ id: 0, firstName: "", surname: "" }];
    const [contactList, setContactList] = useState(initialState);

    const initialEvent = { id: 0, name: "", details: "", datacomMessage: "", image: "" };
    const [event, setEvent] = useState(initialEvent);

    let { eventId } = useParams();

    useEffect(() => {
        if (event["id"] === 0) {
            fetch(`https://datacomecarduat.azurewebsites.net/api/Events/event?id=${eventId}`, {
                headers: {
                    'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setEvent(data);
                });
        }
    }, [event, eventId]);

    useEffect(() => {
        if (contactList.length === 1) {
            fetch("https://datacomecarduat.azurewebsites.net/api/People", {
                headers: {
                    'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setContactList(data);
                });
        }
    }, [contactList]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let f = new FormData(e.target);

        if (eventId !== undefined) {
            f.append('EventId', eventId);
        }

        fetch("https://datacomecarduat.azurewebsites.net/api/Messages", {
            headers: {
                'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
            },
            method: "Post",
            body: f,
        }).then(response => response)
            .then((responseJson) => {
                if (responseJson.status === 200)
                    alert("Message saved successfully");
                else
                    alert("Error while saving message");
            })
    }

    return (
        <>
            <Container fluid id="message-container">
                <Row noGutters className="heading-container">
                    <Col>
                        <h1>{event["name"]}</h1>
                    </Col>
                </Row>

                <Row noGutters className="event-container">
                    <Row noGutters className="details-container">
                        <Col id="event-details">
                            <h1 className="lead"><strong>Event details: </strong></h1>
                            <p>{event["details"]}</p>
                        </Col>
                        <Col id="datacom-message">
                            <h1 className="lead"><strong>Message from Datacom: </strong></h1>
                            <p>{event["datacomMessage"]}</p>
                        </Col>
                    </Row>
                </Row>

                <Row noGutters>
                    <Col>
                        <Form onSubmit={handleSubmit} id="message-form">
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label column>Sender</Form.Label>

                                    <Form.Control column as="select" data-val="true" name="SenderId" required>
                                        <option key={0} value={0}>Choose a sender</option>
                                        {
                                            contactList.map(
                                                sender => <option key={sender.id} value={sender.id}>{sender.firstName + " " + sender.surname}</option>
                                            )
                                        }
                                    </Form.Control>

                                    <Form.Label column>Recipient</Form.Label>

                                    <Form.Control column as="select" data-val="true" name="RecipientId" required>
                                        <option key={0} value={0}>Choose a recipient</option>
                                        {
                                            contactList.map(
                                                recip => <option key={recip.id} value={recip.id}>{recip.firstName + " " + recip.surname}</option>
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label column>Message</Form.Label>

                                    <Form.Control as="textarea" rows="4" name="Pmessage" aria-label="Pmessage" />

                                    <Button type="submit" id="message-button">Save</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};