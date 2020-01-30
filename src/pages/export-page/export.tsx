import React,{useEffect,useState} from "react"
import {Col,Row,Button, Form} from "react-bootstrap"

export const ExportPage: React.FunctionComponent = (props: any) => {
    const [eventList, setEventList] = useState([
        { id: 0, name: "", surname: "", startDate: "", endDate: "", sendDate: "", organisationId: "", details: "", datacomMessage: "", image: "", file: "" }]);
    
    const [eventId, setEventId] = useState(0);
    
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
    const onSelectionChange = (e: any) => {
        setEventId(e.target.value);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if(eventId === 0) return;

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
                error.json().then((json:any) => {
                    console.log(json);
                })
            })
    }

    return (
        <>
            <Col md={12} className="dark-back">
                <div className="container">
                    <Row>
                        <Col>
                        <h3>Export Message to CSV</h3>
                            <Form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className=" control-label col-md-2" htmlFor="eventId">Event</label>
                                        </div>
                                        <select className="form-control" data-val="true" name="eventId" required onChange={(e) => onSelectionChange(e)}>
                                            <option key={0} value={0}>---Please Select an Event</option>
                                            {eventList.map(event => <option key={event.id} value={event.id}>{event.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <Button type="submit" className="btn-btn page-btn">Export to CSV</Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Col>
        </>
    )
};