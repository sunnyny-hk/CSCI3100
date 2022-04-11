import React, { useState, forwardRef, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer , Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import eventBus from "./EventBus";
import './timetableComp.css'
import { set } from "date-fns";

  const localizer = momentLocalizer(moment);

  const defaultView = Views.WEEK;
  const defaultStartTime = new Date("2022-09-04T08:30:00+08:00");
  const defaultEndTime = new Date("2022-09-15T20:00:00+08:00");
  const defaultDate = new Date("2022-09-05")
  const defaultStep = 30
  

  const color = ['AntiqueWhite','Aqua','Beige','CadetBlue','FloralWhite','HotPink']
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



    useEffect(()=>{
      eventBus.on('testing', (data)=>{
        setListEvents(listEvents=>([...listEvents,data]))
        setAllEvents(allEvents=>([...allEvents,...data.filter(e=>e.visible)]))
      })
      return(eventBus.remove('testing'))
    },[])



    const handleSelectEvent =   useCallback((e) => window.alert(`Name: ${e.name}\nVenue: ${e.venue}\nLecturer: ${e.lecturer}\nClass: ${e.class}`),[])

    function eventPropGetter(event) {
      var style = {
        backgroundColor:color[event.atr],
        color:'black'
      }

      return {style:style}
    }




    function readEvent(){
      //TODO: readevent 
      
      //return(events);
    }

    function saveEvent(listEvents){
      //TODO: saveEvent
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
                            <td><button onClick={()=>handleChangeEvent(i,j)}>on/off</button></td>
                            <td><button onClick={()=>handleChangeColor(i,j)}>change</button></td>
                            </tr>
                            
                            </>

                            </>
          
      )
    }


    return (<>

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
        eventPropGetter={event=>eventPropGetter(event)}/>

        <div>
             <table class ="CourseList">
                            <thead>
                            <tr class = "thead">
                            <th>Course Name</th>
                            <th>Venue</th>
                            <th>Lecturer</th>
                            <th>Class</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listEvents.map((list, index) => < CourseList i={index} key={index} list={list} />)}
                            </tbody>

                            
                            
            </table>
                          
        </div>
    </>);
}




export{Test, TimeTable};