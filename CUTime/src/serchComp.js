import { TimeTable } from "./timetableComp";
import React,{useRef} from 'react';

const data = [
    {
        COURSE_ID: 9718,
        COURSE_CODE: "CSCI3100",
        COURSE_NAME: "Software Engineering",
        CREDIT: 3,
        TIME: [1130, 1215],
        DATE: ["Wed"]
        // More Detail

    },
    {
        COURSE_ID: 5799,
        COURSE_CODE: "UGFH1000A",
        COURSE_NAME: "In Dialogue with Humanity",
        CREDIT: 3,
        TIME: [1130, 1215],
        DATE: ["Thur"]
        // More Detail

    },
    {
        COURSE_ID: 4686,
        COURSE_CODE: "ESSC2020",
        COURSE_NAME: "Climate System Dynamics",
        CREDIT: 3,
        TIME: [1430, 1615],
        DATE: ["Mon"]
        // More Detail

    },
    {
        COURSE_ID: 4729,
        COURSE_CODE: "ESSC3120",
        COURSE_NAME: "Physics of the Earth",
        CREDIT: 3,
        TIME: [1530, 1615],
        DATE: ["Tue"]
        // More Detail

    },
    {
        COURSE_ID: 4736,
        COURSE_CODE: "ESSC4030",
        COURSE_NAME: "Engineering Geology",
        CREDIT: 3,
        TIME: [1030, 1215],
        DATE: ["Fri"]
        // More Detail

    },
];

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

function SearchedItem(props) {
    let i = props.i;

    return (
        <tr>
            <td onClick={()=>{
                window.alert("Yes");
            }}>{data[i].COURSE_CODE}</td>
            <td>{data[i].COURSE_NAME}</td>
            <td>{data[i].DATE}</td>
        </tr>
    )
}

function SearchBar(porps) {
    function searchCourse(props) {
        window.alert(document.querySelector("#search-text").value);
    }



    return (
        <>
            <input id="search-text" type="text"></input>
            <button title="search" onClick={searchCourse} >search</button>
        </>
    )
}

function Search(props) {
    return (
        <>
            <SearchBar />

            {/* SearchList */}
            <table>
                <thead>
                    <tr>
                        <td>COURSE_CODE</td>
                        <td>COURSE_NAME</td>
                        <td>DATE</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((result, index) => <SearchedItem i={index} key={index} />)}
                </tbody>
            </table>

        </>
    )
}


export { Search }