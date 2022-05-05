/*
    Description : frontend body part (bottom) act as a router which routes to different URLs with restriction of user role (user/admin) 
                  css of this page is defaulted in index.js
    Contributer : Sunny Tang, Lau Yu Hin, Kwok Chun Yin, Hui Hiu Kit, Wong Man Chun
    Written on : 2022/2/27
    Last modified : 2022/4/10
*/

import React from 'react'
import Login from './auth/Login'
import {Routes, Route} from 'react-router-dom'
import Register from './auth/Register'
import Activation from './auth/Activation'
import NotFound from '../utils/notFound/notFound'
import {useSelector} from 'react-redux'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import Profile from './auth/profile/Profile'
import Main from './auth/timetable/Timetable'
import Manage from './auth/manage/Manage'
import EditUser from './auth/manage/EditUser'
import Home from '../../home/Home'
import { Test ,TimeTable } from './auth/timetable/timetableComp';
import { Search } from './auth/timetable/searchComp';
import { GPA } from './auth/timetable/gpaComp';
import { Friend } from './auth/timetable/friendComp';


function NoMatch() {
    return (
      <div>
        <h3>
          No match 
        </h3>
      </div>
    );
  }

  

function Body(){

    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth

    return(
        <section>
            <Routes>
                <Route path = "/" element = {isLogged? <Main/>: <Home/>}/>


                <Route path = "/login" element = {isLogged? <NotFound/>: <Login/>}/>
                <Route path = "/register" element = {isLogged? <NotFound/>: <Register/>}/>
                <Route path = "/forgotPassword" element = {isLogged? <NotFound/>: <ForgotPassword/>}/>
                <Route path = "/user/reset/:token" element = {isLogged? <NotFound/>: <ResetPassword/>}/>
                <Route path = "/user/activate/:activation_token" element = {<Activation/>}/>

                <Route path = "/profile" element = {isLogged? <Profile/>: <NotFound/>}/> /
                
                <Route path = "/manage" element = { (isLogged && isAdmin)? <Manage/>: <NotFound/>}/> 
                <Route path = "/editUser/:id" element = {(isLogged && isAdmin)? <EditUser/>: <NotFound/>}/> /
                
                <Route path="/timetable" element={(isLogged)? <div className="page"><TimeTable/><Search/></div>: <NotFound/>}/>
                <Route path="/friend" element={ (isLogged)? <Friend/>: <NotFound/>} />
                <Route path="/gpa" element={(isLogged)? <GPA/>: <NotFound/>} />
                <Route path="*" element={(isLogged)? <NoMatch/>: <NotFound/>} />
                
            </Routes>
        </section>
    )
}

export default Body