import React, { useState,useEffect } from 'react';
import './message.css';
import { Form, Col, Button, Row, Modal } from 'react-bootstrap';
export interface messages {
    EventId: string;
    SenderId: Int8Array,
    RecipientId: Int8Array,
    pmessage: string
}
export const MessagePage: React.FunctionComponent = (props: any) => {

    const initialState = [{id:0, firstName:"",surname:""}];
    const[contactList,setContactList]= useState(initialState);
    useEffect(() => {
        if (contactList.length == 1) {
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
            <Col md={12} className="dark-back">
                <div className="container">
                    <h2>EventName</h2>
                    <Row>
                        <Col md={4}>
                            <h3>Event Details</h3>
                            <li>2019 ASB Christmas
                            </li>
                        </Col>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">Sender</Form.Label>
                                    <Col sm="10">
                                        <input type="text" className="form-control" minLength={1} maxLength={50} name="senderId" required />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Recipient</Form.Label>
                                    <Col sm="10">
                                        <select className="form-control" data-val="true" name="recipientId" required>
                                            {contactList.map(recip => <option key={recip.id} value={recip.id}>{recip.firstName + " " + recip.surname}</option>
                                            )}
                                        </select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Message</Form.Label>
                                    <Col sm="10">
                                        <textarea className="form-control" name="pmessage" aria-label="pmessage"></textarea>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button type="submit" className="btn-btn">Submit</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Col>
        </>
    )
};

