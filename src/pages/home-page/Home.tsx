import 'react-dates/initialize';
import './NavMenu.css';
import React, { useState } from 'react';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';


var constant = require('react-dates/constants')
export interface DateState {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface sendDateState {
  sendDate: moment.Moment | null;
}

export const Home: React.FunctionComponent = (props: any) => {

  // DateRangePicker
  let [focusedInput, setFocusedInput] = useState(null);
  let [date, setDate] = useState<DateState>({ startDate: null,
                                              endDate: null,                                 
                                            });        
                    
  // SingleDatePicker
  let [sendDateState, setSendDate] = useState<sendDateState>({sendDate: null});
  let [focus, setFocus] = useState(false);

  return (
    <div>
      <h1>Events</h1>
      <p>This portal is used for sending greeting messages to ASB</p>
      
      <DateRangePicker
        startDate={date.startDate}
        startDateId="startDate"
        endDate={date.endDate}
        endDateId="endDate" 
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput || constant.END_DATE )}
        onDatesChange={({ startDate, endDate }) => setDate({ startDate: startDate,
                                                              endDate: endDate
                                                            })}
        onClose={focusedInput => setFocusedInput(null)}
      />
      <p>Send Date</p>

      <SingleDatePicker
        date={sendDateState.sendDate} // momentPropTypes.momentObj or null
        onDateChange={(date: any) => setSendDate({sendDate: date})} // PropTypes.func.isRequired
        focused={focus} // PropTypes.bool
        onFocusChange={(focused: any ) => setFocus(focused)} // PropTypes.func.isRequired
        id="sendDate" // PropTypes.string.isRequired,
        onClose={focused => setFocus(false)}
      />

    </div>
  );
}