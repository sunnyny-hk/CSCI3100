/*
    Description : part of page for URL "/timetable" 
                  user access this part once they click Timetable button at home page
                  require input from user
                  check the format and send request to backend server by "/searchserver"
                  return the search result to user
                  
                  uses searchComp.css
                  
    Contributer : Lau Yu Hin
    Written on : 2022/3/28
    Last modified : 2022/5/6
*/

import { TimeTable } from "./timetableComp";
import React,{useRef, useState} from 'react';
import './searchComp.css';
import eventBus from "./EventBus";


const exEvent = [
    {
        title: "Example1",
        start: new Date("2022-03-01T12:00:00+08:00"),
        end: new Date("2022-03-01T16:00:00+08:00")
      },
      {
        title: "Example2",
        start: new Date("2022-03-02T12:00:00+08:00"),
        end: new Date("2022-03-02T16:00:00+08:00")
      },
      {
        title: "Example3",
        start: new Date("2022-03-03T12:00:00+08:00"),
        end: new Date("2022-03-03T16:00:00+08:00")
      },
      {
        title: "Example4",
        start: new Date("2022-03-04T12:00:00+08:00"),
        end: new Date("2022-03-04T16:00:00+08:00")
      },
      {
        title: "Example5",
        start: new Date("2022-03-05T12:00:00+08:00"),
        end: new Date("2022-03-05T16:00:00+08:00")
      }
]

const DateMapping = {
    "Mo": "2022-09-05",
    "Tu": "2022-09-06",
    "We": "2022-09-07",
    "Th": "2022-09-08",
    "Fr": "2022-09-09",
    "Sa": "2022-09-10",
    "Su": "2022-09-04"
}
const PMto24 = {
    "01": "13",
    "02": "14",
    "03": "15",
    "04": "16",
    "05": "17",
    "06": "18",
    "07": "19",
    "08": "20",
    "09": "21",
    "10": "22",
    "11": "23"
}

function Search(props) {
    //generate Search component//
    const [data,setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    function SearchedItem(props) {
        //add records to course list//
        let i = props.i;

        return (
            <>
            {data[i].SHOW ?
            <tr onClick={()=>{
                var index = i;
                var objs=[];
                while(data[index]!= undefined&&data[index].COURSE_CODE === data[i].COURSE_CODE){
                    var time;
                    if (data[index].TIME[0].slice(5,7) === "PM" && data[index].TIME[0].slice(0,2) != "12") {time = PMto24[data[index].TIME[0].slice(0,2)]+data[index].TIME[0].slice(2,5);}
                    else if (data[index].TIME[0].slice(6,7) === "AM" && data[index].TIME[0].slice(0,2) == "12"){ time = "00"+data[index].TIME[0].slice(2,5);}
                    else{ time = data[index].TIME[0].slice(0,5);}
                    var start = DateMapping[data[index].DATE]+"T"+time+":00+08:00"
                    if (data[index].TIME[1].slice(5,7) === "PM" && data[index].TIME[1].slice(0,2) != "12") {time = PMto24[data[index].TIME[1].slice(0,2)]+data[index].TIME[1].slice(2,5);}
                    else if (data[index].TIME[1].slice(6,7) === "AM" && data[index].TIME[1].slice(0,2) == "12"){ time = "00"+data[index].TIME[1].slice(2,5);}
                    else{ time = data[index].TIME[1].slice(0,5);}
                    var end = DateMapping[data[index].DATE]+"T"+time+":00+08:00"
                    console.log(start,end)
                    var obj = {
                        title: data[index].COURSE_CODE,
                        start: new Date(start),
                        end: new Date(end),
                        name: data[index].COURSE_CODE+": "+data[index].COURSE_NAME,
                        venue: data[index].VENUE,
                        lecturer: data[index].LECTURER,
                        class: data[index].TUTNO,
                        type: data[index].TYPE,
                        _id: data[index]._id,
                        atr: 2
                    }
                    objs.push(obj)
                    index++;
                }
                
                eventBus.dispatch('testing',objs)
            }}>
                <td>{data[i].COURSE_CODE}</td>
                <td>{data[i].COURSE_NAME}</td>
                <td>{data[i].LECTURER}</td>
                <td>{data[i].VENUE}</td>
                <td>{data[i].CREDIT}</td>
            </tr> : ""}
            </>
        )
    }

    function SearchBar(props) {
        //display search bar//
        function searchCourse(props) {
            //get response from search server//
            fetch("/searchserver?keyword="+document.getElementById("search-text").value).then(
                response => response.json()
            ).then(
                info => {
                    setData(info)
                    console.log(info)
                }
            )
        }

        return (
            <>
                <input 
                id="search-text" 
                type="text" 
                placeholder='Search Course' 
                onKeyPress = { (e) =>{
                    if(e.key ==="Enter"){
                        searchCourse()
                    }
                }}></input> 
            </>
        )


    }
    return (
        <>
            <div className = "Search">
                <h2>Search Course in Term 2</h2>
                <SearchBar />
                <div className = "CourseTable">
                    {data[0]!==undefined ?
                    <table>
                        
                        <thead>
                             
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Lecturer</th>
                                <th>Venue</th>
                                <th>Credit</th>
                            </tr> 
                        </thead>
                        
                        
                        <tbody>
                            {data.map((result, index) => <SearchedItem i={index} key={index} />)}
                        </tbody>
                    </table>
                    : ""}
                </div>
            </div>
        </>
    )
}


export { Search }