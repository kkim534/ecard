import 'react-dates/initialize';
import React, { useState, useEffect } from 'react';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import axios from 'axios';

var constant = require('react-dates/constants')
export interface DateState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface sendDateState {
  sendDate: moment.Moment | null;
}

export const Home: React.FunctionComponent = (props: any) => {
  // Api Key
  const [username, password] = Buffer.from("99d73981-632e-4aa7-8499-169e5da08ef3", "base64").toString().split(":");
  
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
    console.log(e.target.files)
    console.log("hello")
    e.preventDefault(); //prevent browser refresh
    var apiBaseUrl = axios.defaults.baseURL + "user/upload";
    if (e.target.files.length > 0) {
      var filesArray = e.target.files;
      let f = new FormData();
      for (var i in filesArray) {
        //console.log("files",filesArray[i][0]);
        f = new FormData();
        f.append("File", filesArray[i][0])
        axios.post("https://datacomecarduat.azurewebsites.net/Events", f, {
          headers: { 'Content-Type': 'multipart/form-data' },
          auth: { username, password }
        });
      }
      alert("File upload completed");
    }
    else {
      alert("Please select files first");
    }
  }

  // DateRangePicker
  let [focusedInput, setFocusedInput] = useState(null);
  let [date, setDate] = useState<DateState>({
    startDate: null,
    endDate: null,
  });

  // SingleDatePicker
  let [sendDateState, setSendDate] = useState<sendDateState>({ sendDate: null });
  let [focus, setFocus] = useState(false);

  return (
    <>
      <h1>Create events</h1>

      <div className='form-container container'>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="Name">
                  <Form.Label>Event name</Form.Label>
                  <Form.Control type="textarea" placeholder="Enter event name" />
                </Form.Group>

                <Form.Group as={Col} controlId="DatacomMessage">
                  <Form.Label>Datacom message</Form.Label>
                  <Form.Control type="textarea" placeholder="Enter corporate message" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="Details">
                <Form.Label>Event details</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter event details" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="OrganisationId">
                  <Form.Label>Select organisation</Form.Label>
                  <Form.Control as="select" required>
                    {organisationList.map(org =>
                      <option key={org.id} value={org.id}>{org.name}</option>
                    )}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="File">
                  <Form.Label>Upload corporation image</Form.Label>
                  <Form.Control type="file" accept="image/*">
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
                  onClose={focusedInput => setFocusedInput(null)}
                />

                <SingleDatePicker
                  date={sendDateState.sendDate} // momentPropTypes.momentObj or null
                  onDateChange={(date: any) => setSendDate({ sendDate: date })} // PropTypes.func.isRequired
                  focused={focus} // PropTypes.bool
                  onFocusChange={(focused: any) => setFocus(focused)} // PropTypes.func.isRequired
                  id="SendDate" // PropTypes.string.isRequired,
                  onClose={focused => setFocus(false)}
                />
              </div>
              <Row>
                <Col>
                  <br />
                  <Button variant="primary" type="submit" onSubmit={handleSubmit}>
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