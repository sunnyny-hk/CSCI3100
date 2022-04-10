import { TimeTable } from "./timetableComp";
import React,{useRef, useState} from 'react';
import './searchComp.css'


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


function Search(props) {

    const [data,setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    /*const filteredData = data.filter(
        info =>{
            console.log(searchField)
            return (
                info.COURSE_CODE.toLowerCase().includes(searchField.toLowerCase())||
                //info.COURSE_ID.includes(searchField)||
                info.COURSE_NAME.toLower.toLowerCase().includes(searchField.toLowerCase())
            )
        }
    )*/

    function SearchedItem(props) {
        let i = props.i;

        return (
            <tr>
                <td onClick={()=>{
                    window.alert("add "+data[i].COURSE_CODE+ " to the timetable");
                }}>{data[i].COURSE_CODE}</td>
                <td>{data[i].COURSE_NAME}</td>
                <td>{data[i].DATE}</td>
                <td>{data[i].TYPE}</td>
                <td>{data[i].TIME[0]!=="" ? data[i].TIME[0] : ''}{data[i].TIME[0]!=="" ? ' - ' : '/'}{data[i].TIME[1]!=="" ? data[i].TIME[1] : ''}</td>
            </tr>
        )
    }

    function SearchBar(props) {

        function searchCourse(props) {
            window.alert(document.querySelector("#search-text").value);
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

                {/* SearchList */}
                <div className = "CourseTable">
                    {data[0]!==undefined ?
                    <table>
                        
                        <thead>
                             
                            <tr>
                                <th>COURSE_CODE</th>
                                <th>COURSE_NAME</th>
                                <th>DATE</th>
                                <th>TYPE</th>
                                <th>TIME</th>
                            </tr> 
                        </thead>
                        
                        
                        <tbody>
                            {/*console.log(data)*/}
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