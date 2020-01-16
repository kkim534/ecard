import 'react-dates/initialize';
import React, { useState } from 'react';
import './NavMenu.css';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

var constant = require('react-dates/constants')

export interface DateState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export const Home: React.FunctionComponent = (props: any) => {

  let [date, setDate] = useState<DateState>({ startDate: moment(),
                                  endDate: null
                                  });                                                                    
  let [focusedInput, setFocusedInput] = useState(constant.START_DATE);

  return (
    <div>
      <h1>Events</h1>
      <p>This portal is used for sending greeting messages to ASB</p>
      <DateRangePicker
        startDate={date.startDate}
        // startDate={null}
        startDateId="startDate" // PropTypes.string.isRequired,
        endDate={date.endDate}
        // endDate={null}
        endDateId="endDate" // PropTypes.string.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onDatesChange={({ startDate, endDate }) => {setDate({ startDate: startDate,
                                                            endDate: endDate})}}
        onFocusChange={focusedInput => {setFocusedInput(focusedInput || constant.END_DATE )}} 
      />
    </div>
  );
}


