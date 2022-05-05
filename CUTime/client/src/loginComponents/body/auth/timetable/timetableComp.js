/*
    Description :
    Contributer : 
    Written on : 
    Last modified : 
*/

import React, { useState, forwardRef, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer , Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import eventBus from "./EventBus";
import './timetableComp.css'
import { set } from "date-fns";
import {useSelector} from 'react-redux';

  const localizer = momentLocalizer(moment);

  const defaultView = Views.WEEK;
  const defaultStartTime = new Date("2022-09-04T08:30:00+08:00");
  const defaultEndTime = new Date("2022-09-15T20:00:00+08:00");
  const defaultDate = new Date("2022-09-05")
  const defaultStep = 30
  

  const color = ['AntiqueWhite','Aqua','lavender','CadetBlue','chartreuse','HotPink']
  //TODO: Import data from database
  const events = []

  const CSCI2720 =
  {
    title: "CSCI2720",
    start: new Date("2022-09-05T12:00:00+08:00"),
    end: new Date("2022-09-05T16:00:00+08:00"),
    name: "CSCI2720: Building Web Application",
    venue: "UCC206",
    lecturer: "Prof xxx",
    class:"Lec",
    atr: 1,
    visible: true
  }
  
  
  const CSCI3100 =
  {
    title: "CSCI3100",
    start: new Date("2022-09-06T12:00:00+08:00"),
    end: new Date("2022-09-06T16:00:00+08:00"),
    name: "CSCI3100: SoftwareEngineering",
    venue: "Zoom",
    lecturer: "Prof ???",
    class:"T02",
    atr: 2,
    visible: false
  }

function CustomToolbar(){
  return <span></span>
}



function Test(props) {
  let testButton = ()=>{
    eventBus.dispatch('testing',[CSCI3100,CSCI2720])
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
    const [allEvents, setAllEvents] = useState(events);
    const [listEvents, setListEvents] = useState(events);

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth
    const current_id = user._id;

    useEffect(()=>{
      if(user._id){
      readEvent();
      eventBus.on('testing', (data)=>{
        for(let i=0;i<data.length;i++){
          console.log(data[i].type)
          if(data[i].type=="LEC"){
          data[i].visible = true;
          }
        }
        setListEvents(listEvents=>([...listEvents,data]))
        setAllEvents(allEvents=>([...allEvents,...data.filter(e=>e.visible)]))
        console.log("normal")
        console.log(data)
      })
      return(eventBus.remove('testing'))
    }
    },[user._id])



    const handleSelectEvent =   useCallback((e) => window.alert(`Name: ${e.name}\nVenue: ${e.venue}\nLecturer: ${e.lecturer}\nClass: ${e.type+" "+e.class}`),[])
    const formats = {
      eventTimeRangeFormat: () => { 
        return "";
      },
    };

    function eventPropGetter(event) {
      var style = {
        backgroundColor:color[event.atr],
        color:'black'
      }

      return {style:style}
    }




    function readEvent(){
      //TODO: readevent 
      fetch("/timetableserver?current_id="+current_id).then(
          response => response.json()
      ).then(
          data => {
              var colour = 0;
              console.log(data)
              for(let i=0;i<data.length;i++){
                data[i].start = new Date(data[i].start);
                data[i].end = new Date(data[i].end);
                data[i].visible = true;
                if(i==0||data[i].title!=data[i-1].title){colour++;}
                data[i].atr = colour;
              }
              setListEvents(listEvents=>([...listEvents,data]))
              setAllEvents(allEvents=>([...allEvents,...data.filter(e=>e.visible)]))
              console.log(listEvents)

          }
      )
      //return(events);
    }

    function saveEvent(listEvents){
      //TODO: saveEvent
      //update the server//
      console.log(allEvents)
      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({
              type: "save",
              current_id: current_id,
              event: allEvents
          })
          //body: JSON.stringify([ancd])
      }
      fetch("/timetableserver", requestOptions).then(
          response => response.json()
      ).then(
          data => {
              //console.log(data)
          }
      )
    }




    function handleChangeEvent(i,j){
      let lists=listEvents.slice()
      let selectedlist=lists[i]

      if (selectedlist[j].visible){
        selectedlist[j].visible = false
      }else{
        selectedlist[j].visible = true
      }

      if (typeof selectedlist.find(element=>element.visible)=='undefined'){
        lists.splice(i,1)
      }

      setAllEvents(lists.flat().filter(e=>e.visible))
      setListEvents(lists)
      // let lists=listEvents.slice()
      // lists.forEach((list,indexi)=>{
      //   if (index===i){
      //     if(element.visible===true){
      //       element.visible= false
      //     }else{
      //       element.visible = true
      //     }
      //   }
      // })
      // setAllEvents(events.filter((e=>e.visible)))
    }

    function handleChangeColor(i,j){
      let lists=listEvents.slice()
      let selectedlist=lists[i]
      selectedlist[j].atr=(selectedlist[j].atr+1)%6

      setAllEvents(lists.flat().filter(e=>e.visible))
      setListEvents(lists)
    }



    function CourseList(props){
      let i = props.i;
      let list = props.list
      return list.map((element,index)=><CourseCell key={index} event={element} i={i} j={index}/>)
 
      }

    function CourseCell(props){
      let event=props.event;
      let i=props.i
      let j=props.j
      return (

        <>
        <>
        <tr>
                            <td>{event.name}</td>
                            <td>{event.venue}</td>
                            <td>{event.lecturer}</td>
                            <td>{event.class}</td>
                            <td>
                            {event.start.getHours().toString().padStart(2,'0')}:{event.start.getMinutes().toString().padStart(2, '0')}
                            -{event.end.getHours().toString().padStart(2, '0')}:{event.end.getMinutes().toString().padStart(2, '0')}
                            </td>
                            <td><button class="button-71"  onClick={()=>handleChangeEvent(i,j)}>on/off</button></td>
                            <td><button class="button-71" onClick={()=>handleChangeColor(i,j)}>change</button></td>
                            </tr>
                            
                            </>

                            </>
          
      )
    }


    return (<div className="Timetable">

        {/* <div>
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
        </div> */}

        <Calendar localizer={localizer} events={allEvents} defaultView={defaultView} defaultDate={defaultDate} style={{ height: 500, margin: "50px"}} 
        views={{week: true}}  components={{toolbar:CustomToolbar}} min={defaultStartTime} max={defaultEndTime} step={defaultStep} timeslots={2} onSelectEvent={handleSelectEvent} 
        eventPropGetter={event=>eventPropGetter(event)} formats={formats} dayLayoutAlgorithm = 'no-overlap'/>

        <div>
             <table class ="CourseList">
                            <thead>
                            <tr class = "thead">
                            <th>Course Name</th>
                            <th>Venue</th>
                            <th>Lecturer</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Visible</th>
                            <th>color</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listEvents.map((list, index) => < CourseList i={index} key={index} list={list} />)}
                            </tbody>

                            
                            
            </table>
                          
        </div>
        <button class="button-73" onClick={()=>saveEvent()}>Save to server</button>
    </div>);
}




export{Test, TimeTable};