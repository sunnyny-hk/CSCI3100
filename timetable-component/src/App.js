import logo from './logo.svg';
import "./App.css";


import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US":require("date-fns/locale/en-US")
}

const localizer= dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const defaultView = Views.WEEK

//TODO: Import data from database
const events = [
  {
    title:"Example",
    start: new Date("2022-02-01T12:00:00+08:00"),
    end: new Date("2022-02-01T16:00:00+08:00")
  },
  {
    title:"Example2",
    start: new Date("2022-02-02T13:00:00+08:00"),
    end: new Date("2022-02-02T14:00:00+08:00")
  }
]

const exampleEvent = 
  {
    title:"NewExample",
    start: new Date(2022,2,1),
    end: new Date(2022,2,1)
  }



function App() {

  

  const [newEvent, setNewEvent] = useState({title:"",start:"",end:""})
  const [allEvents, setAllEvents] = useState(events)


  function handleAddEvent(e){
    console.log("pass through handleAddEvent Fn");
    setAllEvents([...allEvents, e]);
  }





  return (
    <div className="App">
      <h1>TimeTable</h1>
      <h2>Add New Event</h2>
      
      <div>
        <table>
        <thead>
        <tr>
          <th>Course</th>
          <th>Detail</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><a href='#' onClick={handleAddEvent(exampleEvent)}>CSCI2720</a></td>
          <td>3cred Lecturer Time</td>
        </tr>
        </tbody>
        </table>
      </div>
              

        <Calendar 
          localizer={localizer} 
          events={allEvents} 
          defaultView= {defaultView}
          style={{height:500, margin:"50px"}}>

        </Calendar>
    </div>

  );
}



export default App;
