import logo from './logo.svg';
import "./App.css";
import { Test ,TimeTable } from './timetableComp';
import { Search } from './searchComp';
import { GPA } from './gpaComp';
import { Friend } from './friendComp';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";



function NoMatch() {
  return (
    <div>
      <h3>
        No match 
      </h3>
    </div>
  );
}


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <div>
        <nav class="navbar navbar-expand-sm bg-info ">
         <ul class="navbar-nav text-right">
            <li class="nav-item "><Link to="/" label="Timetable" class="nav-link text-dark">TimeTable</Link></li>
            <li class="nav-item "><Link to="/searchbar" label="Search" class="nav-link text-dark">Search</Link></li>
            <li class="nav-item "><Link to="/friend" label="friend" class="nav-link text-dark">Friend</Link></li>
            <li class="nav-item"><Link to="/gpa" label="Search" class="nav-link text-dark">GPA</Link></li>
            {/* <li class="list-group-item "><Link to="/wrong" label="WrongLink" >WrongLink</Link></li> */}
          </ul>
        </nav>
       
          <hr />

          <Routes>
            <Route path="/" element={<div className="page"><TimeTable/><Search/></div>}/>
            <Route path="/searchbar" element={<Search/>} />
            <Route path="/friend" element={<Friend />} />
            <Route path="/gpa" element={<GPA />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}



export default App;
