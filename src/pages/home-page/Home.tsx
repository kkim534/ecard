import 'react-dates/initialize';
import React, { useState } from 'react';
import './NavMenu.css';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default React.PureComponent;
export const pureComponentAvailable = true;

export const Home: React.FunctionComponent = (props: any) => { 
  // static displayName = Home.name;

  return (
    <div>
      <h1>Events</h1>
          <p>This portal is used for sending greeting messages to ASB</p>
      {/* <DateRangePicker
        startDate={null} // momentPropTypes.momentObj or null,
        startDateId="start_date_id" // PropTypes.string.isRequired,
        endDate={null} // momentPropTypes.momentObj or null,
        endDateId="end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        // onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      /> */}
    </div>
  );
  
}
