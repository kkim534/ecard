import React,{useEffect,useState} from 'react';
import {Col,Row,Button} from 'react-bootstrap'; 


export const ExportPage: React.FunctionComponent = (props: any) => {
    const [eventList, setEventList] = useState([{ id: 0, name: "", surname: "", startDate: "", endDate: "", sendDate: "", organisationId: "", details: "", datacomMessage: "", image: "", file: "" }]);

    useEffect(() => {
        if (eventList.length === 1) {
            fetch("https://datacomecarduat.azurewebsites.net/api/Events", {
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

    return (
        <>

            <Col md={12} className="dark-back">
                <div className="container">
                    {/* <h3>Export Message to CSV</h3> */}
                    <Row>
                        <Col md={6}>
                        <h3>Export Message to CSV</h3>
                            <div className="form-group row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <label className=" control-label col-md-2" htmlFor="eventId">Event</label>
                                    </div>

                                    <select className="form-control" data-val="true" name="eventId" required>
                                        {eventList.map(event => <option key={event.id} value={event.id}>{event.name}</option>
                                        )}
                                    </select>

                                </div>
                            </div>
                            <Button type="submit" className="btn-btn page-btn">Export to CSV</Button>
                        </Col>
                    </Row>
                </div>
            </Col>
        </>
    )
};