import React, { useState, forwardRef, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer , Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import eventBus from "./EventBus";

  const localizer = momentLocalizer(moment);

  const defaultView = Views.WEEK;
  const defaultStartTime = new Date("2022-09-04T08:30:00+08:00");
  const defaultEndTime = new Date("2022-09-15T20:00:00+08:00");
  const defaultDate = new Date("2022-09-05")
  const defaultStep = 30
  

  const color = ['AntiqueWhite','Aqua','Beige','CadetBlue','FloralWhite','HotPink']
  //TODO: Import data from database
  const events = []

  let CSCI2720 =
  {
    title: "CSCI2720",
    start: new Date("2022-09-05T12:00:00+08:00"),
    end: new Date("2022-09-05T16:00:00+08:00"),
    name: "CSCI2720: Building Web Application",
    venue: "UCC206",
    lecturer: "Prof xxx",
    class:"T02",
    atr: 1
  }
  
  
  let CSCI3100 =
  {
    title: "CSCI3100",
    start: new Date("2022-09-06T12:00:00+08:00"),
    end: new Date("2022-09-06T16:00:00+08:00"),
    name: "CSCI2720: Building Web Application",
    venue: "UCC206",
    lecturer: "Prof xxx",
    class:"T02",
    atr: 2
  }

function CustomToolbar(){
  return <span></span>
}



function Test(props) {
  let testButton = ()=>{
    eventBus.dispatch('testing',{CSCI3100})
    console.log('testing')
    };

  return (
      <>
      <p>hello</p>
      <button onClick={testButton}>123</button>
      </>
  )
}

function TimeTable (props) {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" , name:"", venue:"", lecturer:"",class:"",color:""});
    const [allEvents, setAllEvents] = useState(events);

  

    const handleSelectEvent =   useCallback((e) => window.alert(`Name: ${e.name}\nVenue: ${e.venue}\nLecturer: ${e.lecturer}\nClass: ${e.class}`),[])




    function eventPropGetter(event) {
      var style = {
        backgroundColor:color[event.atr],
        color:'black'
      }

      return {style:style}
    }

    


    function handleAddEvent(eve) {
      console.log("pass through handleAddEvent Fn");
      setAllEvents([...allEvents, eve]);
    }

    useEffect(()=>{
      eventBus.on('testing',(data)=>{
        console.log('on')
        setAllEvents([...allEvents,data])
      })
      return ()=>{
        console.log('remove')
        eventBus.remove('testing')}
      },[])



    return (<>
        {/* This is an temporary function to add event to the time table */}
        <div>
            <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
            <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
            <button stlye={{ marginTop: "10px" }} onClick={() => handleAddEvent(newEvent)}>
                Add Event
            </button>
        </div>

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
                        <td><a href='#' onClick={() => handleAddEvent(CSCI2720)}>CSCI2720</a></td>
                        <td>3cred Lecturer Time</td>
                       
                    </tr>
                    <tr>
                        <td><a href='#' onClick={() => handleAddEvent(CSCI3100)}>CSCI3100</a></td>
                        <td>3cred Lecturer Time</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Calendar localizer={localizer} events={allEvents} defaultView={defaultView} defaultDate={defaultDate} style={{ height: 500, margin: "50px"}} 
        views={{week: true}}  components={{toolbar:CustomToolbar}} min={defaultStartTime} max={defaultEndTime} step={defaultStep} timeslots={2} onSelectEvent={handleSelectEvent} 
        eventPropGetter={event=>eventPropGetter(event)}/>
    </>);
}




export{Test, TimeTable};