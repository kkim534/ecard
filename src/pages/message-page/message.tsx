import React, { useState, useContext } from 'react';
import './message.css';
import { Form, FormGroup, Col, Button, Row } from 'react-bootstrap';
// import {message} from './message-model';

// import { Button} from 'react-bootstrap';
// import {DataContext} from '../../contexts/data-context';


export interface messages {
    EventID: string;
    SenderID: Int8Array,
    RecipientID: Int8Array,
    message: string
}

//Submit EventMessage
//const handleSubmit = (evt:any) => 

export const MessagePage: React.FunctionComponent = (props: any) => {

    let [EventID, setEventID] = useState(" ")
    let [SenderID, setSenderID] = useState(" ")
    let [RecipientID, setRecipientID] = useState(" ")
    let [message, setMessage] = useState(" ")


    return (
        <>
            <Col md={12} className="dark-back">
                <div className="container">
                    <h1>(EventName from back-end)</h1>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form>
                                <div className="form-group row">
                                    <label className="control-label col-md-2" htmlFor="EventID">Event Name</label>
                                    <div className="col-md-3">
                                        <input className="form-control" type="textarea" name="EventID" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="control-label col-md-2" htmlFor="SenderID">Sender Name</label>
                                    <div className="col-md-3">
                                        <input className="form-control" type="textarea" name="Sender ID" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="control-label col-md-2" htmlFor="RecipientID"> Recipient Name</label>
                                    <div className="col-md-3">
                                        <input className="form-control" type="textarea" name="Recipient ID" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <label className="control-label col lg-2" htmlFor="Message"></label>
                                        <span className="input-group-text"> Message Here</span>
                                    </div>
                                    <textarea className="form-control" aria-label=" Message Here"></textarea>
                                </div>
                                </div>
                                <div>
                                    <Row className="justify-container">
                                        <Col md="10"></Col>
                                        <Col md="2">
                                            <Button type="submit" className="btn btn-primary md-2"> Submit</Button>
                                        </Col>
                                    </Row>

                                </div>
                            </Form>
                        </Col>
                    </Row>

                </div>
            </Col>
        </>

    )
};










