import 'react-dates/initialize';
import React, { useState, useEffect } from 'react';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

var constant = require('react-dates/constants')
export interface DateState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
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

      <div className='form-container container'>
      <h1>Create events</h1>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="Name">
                  <Form.Label>Event name</Form.Label>
                  <Form.Control type="textarea" name="Name" placeholder="Enter event name" />
                </Form.Group>

                <Form.Group as={Col} controlId="DatacomMessage">
                  <Form.Label>Datacom message</Form.Label>
                  <Form.Control type="textarea" name="DatacomMessage" placeholder="Enter corporate message" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="Details">
                <Form.Label>Event details</Form.Label>
                <Form.Control as="textarea" rows="3" name="Details" placeholder="Enter event details" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="OrganisationId">
                  <Form.Label>Select organisation</Form.Label>
                  <Form.Control as="select" name="OrganisationId" required>
                    {organisationList.map(org =>
                      <option key={org.id} value={org.id}>{org.name}</option>
                    )}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="File">
                  <Form.Label>Upload corporation image</Form.Label>
                  <Form.Control type="file" name="File" accept="image/*">
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <div className='date-container'>
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

                <SingleDatePicker
                  date={sendDateState.sendDate} // momentPropTypes.momentObj or null
                  onDateChange={(date: any) => setSendDate({ sendDate: date })} // PropTypes.func.isRequired
                  focused={focus} // PropTypes.bool
                  onClose={(date) => setFocus(false)}
                  onFocusChange={(focused) => setFocus(true)} // PropTypes.func.isRequired
                  id="SendDate" // PropTypes.string.isRequired,
                />
              </div>
              <Row>
                <Col>
                  <br />
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}