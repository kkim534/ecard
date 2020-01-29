import React, { useState, useEffect } from 'react';
import './message.css';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { useParams } from "react-router";
// export interface messages {
//     EventId: string;
//     SenderId: Int8Array,
//     RecipientId: Int8Array,
//     pmessage: string
// }

export const MessagePage: React.FunctionComponent = (props: any) => {

    const initialState = [{ id: 0, firstName: "", surname: "" }];
    const [contactList, setContactList] = useState(initialState);

    let { eventId } = useParams();

    console.log(eventId);
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
            f.append('eventId', eventId);
        }

        fetch("https://localhost:5001/api/Messages", {
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
                                <div className="form-group row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="control-label col-md-2" id="senderId" htmlFor="senderId">Sender</label>
                                        </div>
                                        <select className="form-control" data-val="true" name="senderId" required>
                                            {contactList.map(sender => <option key={sender.id} value={sender.id}>{sender.firstName + " " + sender.surname}</option>
                                            )}
                                        </select>                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className=" control-label col-md-2" htmlFor="recipientId">Recipient</label>
                                        </div>

                                        <select className="form-control" data-val="true" name="recipientId" required>
                                            {contactList.map(recip => <option key={recip.id} value={recip.id}>{recip.firstName + " " + recip.surname}</option>
                                            )}
                                        </select>

                                    </div>
                                    <div className="form-group row">
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="control-label col-md-5" id="pmessage" htmlFor="pmessage">Message</label>
                                        </div>
                                        <textarea className="form-control" name="pmessage" aria-label="pmessage"></textarea>
                                    </div>
                                    <div>
                                        <Row className="justify-container">
                                            <Col md="10"></Col>
                                            <Col md="2">
                                                <Button type="submit" className="btn-btn"> Submit</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Col>
        </>
    )
};









