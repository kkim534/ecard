import 'react-dates/initialize';
import './NavMenu.css';
import React, { useState } from 'react';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import { Form, Button, Col, Row } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import axios from 'axios';
import './Home.css'

var constant = require('react-dates/constants')
export interface DateState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface sendDateState {
  sendDate: moment.Moment | null;
}

export const Home: React.FunctionComponent = (props: any) => {

  const handleChange = (e: any) => {
    console.log(e.target.files)
    e.preventDefault(); //prevent browser refresh
    var apiBaseUrl = axios.defaults.baseURL + "user/upload";
    if (e.target.files.length > 0) {
      var filesArray = e.target.files;
      let f = new FormData();
      for (var i in filesArray) {
        //console.log("files",filesArray[i][0]);
        f = new FormData();
        f.append("File", filesArray[i][0])
        axios.post(apiBaseUrl, f, {
          headers: { 'Content-Type': 'multipart/form-data' }
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
                <Form.Group as={Col} controlId="formEventName">
                  <Form.Label>Event name</Form.Label>
                  <Form.Control type="textarea" placeholder="Enter event name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formCorporateMessage">
                  <Form.Label>Datacom message</Form.Label>
                  <Form.Control type="textarea" placeholder="Enter corporate message" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formEventDetails">
                <Form.Label>Event details</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter event details" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="organisationSelect">
                  <Form.Label>Select organisation</Form.Label>
                  <Form.Control as="select">
                    <option>Datacom</option>
                    <option>ASB</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="imageInput">
                  <Form.Label>Upload corporation image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleChange}>
                  </Form.Control>
                </Form.Group>
              </Form.Row>



              <div className='date-container'>
                <DateRangePicker
                  startDate={date.startDate}
                  startDateId="startDate"
                  endDate={date.endDate}
                  endDateId="endDate"
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
                  id="sendDate" // PropTypes.string.isRequired,
                  onClose={focused => setFocus(false)}
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