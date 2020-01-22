import React, { useState, useContext } from 'react';
import './message.css';
import { Form, Col, Button, Row } from 'react-bootstrap';


export interface messages {
    EventID: string;
    SenderID: Int8Array,
    RecipientID: Int8Array,
    message: string
}


export const MessagePage: React.FunctionComponent = (props: any) => {

    return (
        <>
            <Col md={12} className="dark-back">
                <div className="container">
                    <h2>EventName</h2>
                    <Row>
                        <Col md={4}>
                            <h3>Details</h3>
                            <li>API
                            </li>
                        </Col>
                        <Col>
                            <Form>
                                <div className="form-group row">
                                    <label className="control-label col-md-2" htmlFor="SenderID"> Sender</label>
                                    <div className="col-md-6">
                                        <input className="form-control" type="textarea" name="Sender ID" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="control-label col-md-2" htmlFor="RecipientID"> Recipient</label>
                                    <div className="col-md-6">
                                        <input className="form-control" type="textarea" name="Recipient ID" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <label className="control-label col lg-3" htmlFor="Message"></label>
                                        <span className="input-group-text"> Message </span>
                                    </div>
                                    <textarea className="form-control" aria-label=" Message"></textarea>
                                </div>
                                </div>
                                <div>
                                    <Row className="justify-container">
                                        <Col md="10"></Col>
                                        <Col md="2">
                                            <Button type="submit" className="btn-btn"> Submit</Button>
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









