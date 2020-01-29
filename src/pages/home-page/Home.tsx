import 'react-dates/initialize';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Col} from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';
export default React.PureComponent;


export const Home: React.FunctionComponent = (props: any) => {

    const initialStateValue = [{ id: 0, name: "" }];
    const [EventList, setEventList] = useState(initialStateValue);
    useEffect(() => {
        if (EventList.length == 1) {
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
        <div>
            <Col>
            <h1>Events</h1>
            <h4>This portal is used for sending greeting messages to ASB</h4>
            <div className="form-group row">
                <div className="col-md-3">
                    <label htmlFor="Title">Please select an event to send message</label>
                </div>
                <ul className="navbar-nav flex-grow">
                    {EventList.map(event =>
                        <NavLink key={event.id} tag={Link} className="text-dark" to={`message/${event.id}`}>
                            {event.name}
                        </NavLink>
                    )}
                </ul>
            </div>
            </Col>
        </div>
        
    );

}