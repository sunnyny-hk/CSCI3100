/*
    Description :
    Contributer : 
    Written on : 
    Last modified : 
*/

import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React,{useEffect, useRef, useState} from 'react';
import './gpaComp.css'
import {useSelector} from 'react-redux';

var GPARex = /^(:?A|A-|B\+|B|B-|C\+|C|C-|D\+|D|F)$/;

const GPAMapping = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0
}
function GPA(props){
    const [COURSEGPA,setCOURSEGPA]= useState([]);
    const [backendData,setBackendData]= useState([{}]) //for checking only//
    const [message,setmessage] = useState();

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth
    const current_id = user._id;
    
    useEffect(() => {
        if(user._id)
        fetch("/gpaserver?current_id="+current_id).then(
            response => response.json()
        ).then(
            data => {
                if(data[0] != null && typeof(data)!='string'){
                    var trimmed = [];
                    for(let i=0; i<data.length;i++){
                        if(i==0||data[i].COURSE_CODE!=data[i-1].COURSE_CODE){
                            trimmed.push(data[i])
                        }
                    }
                setCOURSEGPA(trimmed)
                console.log(trimmed)
                }else{
                    setmessage(data)
                    console.log(data)
                }
            }
        )
    },[user._id])

    
    const [termGPA, setTermGPA] = useState(0);
    //let termGPA=0;
    let i =0;
    let creditSum=0;
    let GPASum = 0;
    
    function Calc(){
        //console.log(termGPA);
        //setTermGPA('0');
        //console.log("");
        //console.log("start termGPA "+termGPA);
        GPASum = 0;
        creditSum = 0;
        COURSEGPA.map((a) =>{
            //termGPA += a.GPA *3;
            //setTermGPA(a.GPA *3);
            //console.log(a.COURSE_NAME);
            GPASum = GPASum + (a.GPA *a.COURSE_CREDIT);
            //console.log("GPA sum = " + GPASum);
            
            //setTermGPA(GPASum);
            //console.log(a.GPA *3);
            //console.log("credit sum = "+creditSum);
            creditSum = creditSum + (1*a.COURSE_CREDIT);
        });
        //console.log("gpa sum = "+GPASum);
        const CGPA = (GPASum /creditSum) || -1
        setTermGPA(CGPA);
        
        //console.log("Credit Sum = "+ creditSum);

        //console.log("term GPA = "+ termGPA);
        //alert(termGPA);
    }
    
    function RequestCalculation(){
        //calculate the overall GPA
        //relatedCourseInfo(CourseID);
        Calc();
                
        return (
            <>
            <h2>Term GPA = {termGPA < 0.00 ? "/" :termGPA.toFixed(2)}</h2>
            {//<button title="UpdateGPA" onClick={() => Calc()} >Generate Term GPA</button>
            //<p>{termGPA.toFixed(2)}</p>
            }
            </>
        )
    }
    
    function RelatedCourseInfo(CourseID){
        //Get the course Info from the database
    }
    
    function GetGPA(CourseID){
        //console.log(COURSEGPA);
        let i = CourseID.i;
        //console.log("b");
        //const [inputGPA, setInputGPA] = useState('');
        //const inputGPA = COURSEGPA[2].GPA;
        //console.log(typeof(inputGPA))
        //console.log(inputGPA.toFixed(1))
        return(
            <>
            <tr class="GPA-text">
                <td>{COURSEGPA[i].COURSE_CODE}</td>
                <td>{COURSEGPA[i].COURSE_NAME}</td>
                <td>{COURSEGPA[i].COURSE_CREDIT}</td>
                <td>{COURSEGPA[i].GPA >=0 ? COURSEGPA[i].GPA.toFixed(1) : '/'}</td>
                
                <td><input 
                    id={COURSEGPA[i].COURSE_CODE} 
                    type="text"
                    placeholder='A-F'
                    maxLength={2}
                    //value={COURSEGPA[i].GPA}
                    onKeyPress = { (e) =>{
                        if(e.key ==="Enter"){
                            console.log(GPARex.exec(e.target.value))
                            console.log(e.target.value)
                            if(!GPARex.exec(e.target.value)){
                                window.alert("Wrong input")
                                e.target.value = null
                            }else{
                            SaveGPA(i, GPAMapping[document.getElementById(COURSEGPA[i].COURSE_CODE).value]);
                            Calc();
                            }
                        }
                    }}
                />
                </td>
            </tr> 
            </>
        )
        //return ;
    }
    
    
    
    function SaveGPA(CourseID, CourseGPA){
        //console.log(CourseID);
        //console.log(CourseGPA);
        const newobj = COURSEGPA[CourseID];
        newobj.GPA = CourseGPA;
        //setCOURSEGPA[CourseID].GPA(CourseGPA);
        //const updateByIndex = (CourseGPA, CourseID) => {
            setCOURSEGPA(COURSEGPA => COURSEGPA.map((value, i) => i === CourseID ? newobj: value));
          //};
        //console.log(COURSEGPA[CourseID].GPA);

        //update the server//
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({
                current_id: current_id,
                COURSE_ID: COURSEGPA[CourseID]._id,
                COURSEUpdatedGPA: CourseGPA
            })
            //body: JSON.stringify([ancd])
        }
        fetch("/gpaserver", requestOptions).then(
            response => response.json()
        ).then(
            data => {
                //console.log(data)
            }
        )
    }
    
    function DisplayGPA(userID){
        //display user course result
        
        let i = COURSEGPA.i;
        return(
            <tr>
                <td>{COURSEGPA[i].COURSE_CODE}</td>
                <td>{COURSEGPA[i].COURSE_NAME}</td>
                <td>{COURSEGPA[i].COURSE_CREDIT}</td>
                <td>{COURSEGPA[i].GPA}</td>
            </tr>
        )
    }
    return(
        <>
        <div className= "GPA">
                <h2>GPA Calculator</h2>
                <table class = "GPATable">
                    <thead>
                        <tr>
                            <th id = "CourseCode">Course Code </th>
                            <th id = "CourseName">Course Name</th>
                            <th id = "CourseCredit">Course Credit</th>
                            <th id = "CourseGPA">Course GPA</th>
                            <th id = "input">Update GPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {COURSEGPA.map((result, index) => <GetGPA i={index} key={index} />)}
                    </tbody>
                </table>
                
                {(typeof COURSEGPA[0] === 'undefined'&&typeof(COURSEGPA) !== 'string'&&message ==="") ? (
                    <p>Loading...</p>
                ) : (
                    /*COURSEGPA.map((user,i) =>(
                        <p key = {i}>{user.COURSE_NAME}</p>
                    ))*/[]
                )}
                {(message !=="") ? (
                    <p>{message}</p>
                ) : (
                    /*COURSEGPA.map((user,i) =>(
                        <p key = {i}>{user.COURSE_NAME}</p>
                    ))*/[]
                )}
                <RequestCalculation />
            </div>
        </>
    )
}

export{GPA}