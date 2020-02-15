import React, { useEffect, useState } from "react"
import { Col, Row, Button, Form, Container } from "react-bootstrap"
import './export.css'

export const ExportPage: React.FunctionComponent = (props: any) => {
    const [eventList, setEventList] = useState([
        { id: 0, name: "", surname: "", startDate: "", endDate: "", sendDate: "", organisationId: "", details: "", datacomMessage: "", image: "", file: "" }]);

    const [eventId, setEventId] = useState(0);
    const initialState = [{ id: 0, firstName: "", surname: "" }];
    const [contactList, setContactList] = useState(initialState);


    useEffect(() => {
        if (eventList.length === 1) {
            fetch("https://datacomecarduat.azurewebsites.net/api/Events/current", {
                headers: {
                    "ApiKey": "99d73981-632e-4aa7-8499-169e5da08ef3"
                }
            })
                .then(response => response.json())
                .then(data => {
                    setEventList(data);
                });
        }
    }, [eventList]);
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



    const onSelectionChange = (e: any) => {
        setEventId(e.target.value);
    }

    const handleSubmitExport = (e: any) => {
        e.preventDefault();

        if (eventId === 0) return;

        fetch(`https://datacomecarduat.azurewebsites.net/api/Messages/export?eventId=${eventId}`, {
            headers: {
                "ApiKey": "99d73981-632e-4aa7-8499-169e5da08ef3"
            }
        }).then(response => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "messages.csv");
                document.body.appendChild(link);
                link.click();
                link.parentNode?.removeChild(link);
            })
            .catch(error => {
                error.json().then((json: any) => {
                    console.log(json);
                })
            })
    }

    const handleSubmitEmail = (e: any) => {
        e.preventDefault();

        if (eventId === 0) return;

        fetch(`https://datacomecarduat.azurewebsites.net/api/Notification/SendNotification?eventId=${eventId}`, {
            headers: {
                "ApiKey": "99d73981-632e-4aa7-8499-169e5da08ef3"
            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200)
                    alert(responseJson.message);
                else
                    alert("Error sending email request. Please try again later.");
            })
    }

    return (
        <>
            <Container fluid id="export-container">
                <div className="heading-container">
                    <h1>Export/Send</h1>
                </div>

                <div className="content">
                    <Col md={12} className="dark-back">
                        <Form onSubmit={handleSubmitExport}>
                            <h2>Export Messages to CSV</h2>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">Event</Form.Label>
                                <Col sm="10">
                                    <select className="form-control" data-val="true" name="eventId" required onChange={(e) => onSelectionChange(e)}>
                                        <option key={0} value={0}>---Please Select an Event</option>
                                        {eventList.map(event => <option key={event.id} value={event.id}>{event.name}</option>
                                        )}
                                    </select>
                                    <Button type="submit" className="btn-btn page-btn">Export</Button>
                                </Col>
                            </Form.Group>
                        </Form>

                        <Form onSubmit={handleSubmitEmail}>
                            <h2>Send Messages via Email</h2>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">Sender</Form.Label>
                                <Col sm="10">
                                    <select className="form-control" data-val="true" name="senderId" required>
                                        <option key={0} value={0}>---Please Select a sender</option>
                                        {contactList.map(contact => <option key={contact.id} value={contact.id}>{contact.firstName + " " + contact.surname}</option>
                                        )}
                                    </select>
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">Event</Form.Label>
                                <Col sm="10">
                                    <select className="form-control" data-val="true" name="eventId" required onChange={(e) => onSelectionChange(e)}>
                                        <option key={0} value={0}>---Please Select an Event</option>
                                        {eventList.map(event => <option key={event.id} value={event.id}>{event.name}</option>
                                        )}
                                    </select>
                                    <Button type="submit" className="btn-btn page-btn">Send</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </div>
            </Container>
        </>

    );
}
