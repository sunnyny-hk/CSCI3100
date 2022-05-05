/*
    Description : frontend header part act as a router which 
                  show navigation bar linking to respective URLs with restriction of user role (user/admin) and curent state
                  For user have not logged in: 
                        only show sign up and sign in
                  For user have logged in:
                        show all common user functions (timetable, friend, GPA, logout, profile)
                  For admin:
                        show all common user functions and mange

                  uses header.css
                  
    Contributer : Sunny Tang, Lau Yu Hin, Kwok Chun Yin, Hui Hiu Kit, Wong Man Chun
    Written on : 2022/2/27
    Last modified : 2022/4/10
*/

import React from 'react'
import {Link} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import s

import {useSelector} from 'react-redux'
import axios from 'axios'

function Header(){
    const auth = useSelector(state => state.auth)

    const {user, isLogged, isAdmin} = auth
    
    const handleLogout = async () => {
        try{
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/"
        }catch (err){
            window.location.href = "/"
        }
    }

    const userLink = () =>{ //after login
         
        return <ul>
        <li className='drop-nav'>
            <Link to = "/">
            <img src = {user.image} alt = ""/>{user.userName}<i className ="fa-solid fa-angle-down"></i>
            </Link>
            <ul className= 'dropDown'>
                <li><Link to= "/profile">Profile</Link> </li>
                {
                    isAdmin?
                    <li><Link to= "/manage" >Manage</Link> </li>: true
                }
                <li><Link to= "/" onClick={handleLogout}>Logout</Link> </li>
            </ul>
        </li> 
        </ul>
       
            
    }

    const Navbar = () =>{
        return <><nav class="navbar">
        <ul class="navbar-nav">
           <li class="nav-item "><Link to="/timetable" label="Timetable" class="nav-link text-dark">TimeTable</Link></li>
           <li class="nav-item "><Link to="/friend" label="friend" class="nav-link text-dark">Friend</Link></li>
           <li class="nav-item"><Link to="/gpa" label="Search" class="nav-link text-dark">GPA</Link></li>
           {/* <li class="list-group-item "><Link to="/wrong" label="WrongLink" >WrongLink</Link></li> */}
         </ul>
       </nav>
      </>
    }

    return(
        <header>
            <div className="top-header">
            <div className='logo'>
                <h1>
                    <Link to = "/">CUTime</Link>
                </h1>
            </div>
            
            
                
                {
                    isLogged?
                    userLink()
                    : 
                    <ul> 
                        <li><Link to = "/login"><i className ="fa-solid fa-arrow-right-to-bracket"></i> Sign In</Link></li>
                        <li><Link to = "/register"><i className ="fa-solid fa-user"></i> Sign Up</Link></li>
                    </ul>
                    
                } 
            </div> 
                {
                    isLogged?
                    Navbar()
                    : 
                    ""
                    
                } 
           
        </header>
    )
}

export default Header