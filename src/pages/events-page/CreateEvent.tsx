import 'react-dates/initialize';
import React, { useState, useEffect } from 'react';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import './CreateEvent.css'

var constant = require('react-dates/constants')
export interface DateState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface singleDateState {
  sendDate: moment.Moment | null;
}

export const CreateEvent: React.FunctionComponent = (props: any) => {

  // DateRangePicker
  let [focusedInput, setFocusedInput] = useState(null);
  let [date, setDate] = useState<DateState>({
    startDate: null,
    endDate: null
  });

  // SingleDatePicker
  let [focus, setFocus] = useState(false);
  let [sendDateState, setSendDate] = useState<singleDateState>({
    sendDate: null
  });

  // set organisation drop down list
  const initialStateValue = [{ id: 0, name: " --- Select A Organisation --- " }];
  const [organisationList, setOrganisationList] = useState(initialStateValue);

  useEffect(() => {
    if (organisationList.length === 1) {
      fetch("https://datacomecarduat.azurewebsites.net/api/Organisations", {
        headers: {
          "ApiKey": "99d73981-632e-4aa7-8499-169e5da08ef3"
        }
      })
        .then(response => response.json())
        .then(data => {
          setOrganisationList(data);
        });
    }
  }, [organisationList]);

  const handleSubmit = (e: any) => {
    e.preventDefault(); //prevent browser refresh

    let f = new FormData(e.target);
    fetch("https://datacomecarduat.azurewebsites.net/api/Events", {
      headers: {
        'ApiKey': '99d73981-632e-4aa7-8499-169e5da08ef3'
      },
      method: "Post",
      body: f,
    }).then(response => response)
      .then((responseJson) => {
        if (responseJson.status === 200)
          alert("Event created successfully");
        else
          alert("Error while creating event");
      })
  }
  return (
    <>
      <Container fluid id="create-event-container">
        <div className="heading-container">
          <h1>Create an Event</h1>
        </div>

        <div className="content">
          <Form id="form-createEvent" onSubmit={handleSubmit}>
            <Form.Group id="eventForm.eventInput1">

              <Form.Label className="col-form-label-lg" style={{ width: '100%', textAlign: 'left' }}>Event name:</Form.Label>
              <Form.Control size="lg" type="textarea" name="Name" placeholder="Enter the event name" />

              <Form.Label className="col-form-label-lg" style={{ width: '100%', textAlign: 'left' }}>Datacom message:</Form.Label>
              <Form.Control size="lg" type="textarea" name="DatacomMessage" placeholder="Enter the corporate message" />

              <Form.Label className="col-form-label-lg" style={{ width: '100%', textAlign: 'left' }}>Event details:</Form.Label>
              <Form.Control size="lg" as="textarea" rows="3" name="Details" placeholder="Enter event details" />

            </Form.Group>

            <Row>
              <Col>
                <p className="col-form-label-lg" style={{ textAlign: 'left' }}>Select organisation:</p>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
                  </div>
                  <select name="OrganisationId" className="custom-select" id="inputGroupSelect01">
                    {organisationList.map(org =>
                      <option key={org.id} value={org.id}>{org.name}</option>
                    )}
                  </select>
                </div>
              </Col>
              <Col>
                <p className="col-form-label-lg" style={{ textAlign: 'left' }}>Upload event image:</p>
                <div className="input-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon1">Upload</span>
                  </div>
                  <div className="custom-file">
                    <input type="file" name="File" accept="image/*" className="custom-file-input" id="inputGroupFileAddon1" aria-describedby="inputGroupFileAddon1" />
                    <label className="custom-file-label" htmlFor="inputGroupFileAddon1">Choose file</label>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <p className="col-form-label-lg">Select event dates:</p>
              </Col>
              <Col>
                <p className="col-form-label-lg">Send date:</p>
              </Col>
            </Row>
            
            <Row>
              <Col>
                <DateRangePicker
                  startDate={date.startDate}
                  startDateId="StartDate"
                  endDate={date.endDate}
                  endDateId="EndDate"
                  focusedInput={focusedInput}
                  onFocusChange={focusedInput => setFocusedInput(focusedInput || constant.END_DATE)}
                  onDatesChange={({ startDate, endDate }) => setDate({
                    startDate: startDate,
                    endDate: endDate
                  })}
                  onClose={({ startDate, endDate }) => setFocusedInput(null)}
                />
              </Col>
              <Col>
                <SingleDatePicker
                  date={sendDateState.sendDate} // momentPropTypes.momentObj or null
                  onDateChange={(date: any) => setSendDate({ sendDate: date })} // PropTypes.func.isRequired
                  focused={focus} // PropTypes.bool
                  onClose={(date) => setFocus(false)}
                  onFocusChange={(focused) => setFocus(true)} // PropTypes.func.isRequired
                  id="SendDate" // PropTypes.string.isRequired,
                />
              </Col>
            </Row>

            <Button className="btn btn-primary float-right" size="lg" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}