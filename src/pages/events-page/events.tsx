import 'react-dates/initialize';
import React,{ useState,useEffect } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

 

export default React.PureComponent;

export const pureComponentAvailable = true;

 

export const Event: React.FunctionComponent = (props: any) => { 

  // static displayName = Home.name;

  const initialStateValue = [{ id: 0, name: "" }];

  const[EventList,setEventList] = useState(initialStateValue);

 

  useEffect(() =>{

    if(EventList.length == 1)

    {

    fetch('https://datacomecarduat.azurewebsites.net/api/Events')

        .then(response => response.json())

        .then(data => {

            setEventList(data);

            

        });

    }

},[EventList]);

 

  return (

    <div>

      <h1>Events</h1>

          <p>This portal is used for sending greeting messages to ASB</p>

          <div className="form-group row">

          <div className="col-md-3">

          <label htmlFor="Title">Please select an event to send message</label>

          </div>

              <ul className="navbar-nav flex-grow">

                {EventList.map(event =>

                                   

                                   <NavLink tag={Link} className="text-dark" to={`AddCotact/${event.id}`}>

                                     {event.name}

                                   </NavLink>

                            )}

              </ul>

          </div>

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