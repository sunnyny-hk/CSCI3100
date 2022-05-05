/*
    Description :
    Contributer : 
    Written on : 
    Last modified : 
*/

import logo from './logo.svg';
import "./Timetable.css";
import { Test ,TimeTable } from './timetableComp';
import { Search } from './searchComp';
import { GPA } from './gpaComp';
import { Friend } from './friendComp';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {useSelector} from 'react-redux';


function NoMatch() {
  return (
    <div>
      <h3>
        No match 
      </h3>
    </div>
  );
}


function Main() {
  const auth = useSelector(state => state.auth)

  const {user, isLogged} = auth

  return (
    <div className='home_page'>
        <h2>Welcome {user.userName} To CUTime</h2>

    </div>
  )
}



export default Main;
