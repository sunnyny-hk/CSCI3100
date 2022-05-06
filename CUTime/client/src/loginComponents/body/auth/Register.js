/*
    Description : page for URL "/register" 
                  user access this page once they click signUp button at home page
                  require input for CUHK email, username, pw and confirm pw
                  check the format and send request to backend server by "/user/register"
                  
                  uses auth.css

    Contributer : Kwok Chun Yin, Hui Hiu Kit
    Written on : 2022/2/27
    Last modified : 2022/4/8
*/


import React, {useState} from "react";
import {Link} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/notification'
import axios from 'axios'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/validation'

const initalState = {
    userName: '',
    email: '',
    password: '',
    cf_password: '', 
    err: '',
    success: ''
}

function Register(){
    const [user, setUser] = useState(initalState)
    
    const {userName, email, password, cf_password, err, success} = user
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUser({...user, [name]: value, err:  '',success: '' })
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            // fromat checking at frontend
            if (isEmpty(userName) || isEmpty(password))
                return setUser({...user, err: "Please fil all fields", success: '' })

            if (!isEmail(email)) // check CUHK email
                return setUser({...user, err: "Invalid email", success: '' })

            if (isLength(email)) 
                return setUser({...user, err: "Password at least 8 characters", success: '' })

            if (!isMatch(password, cf_password)) 
                return setUser({...user, err: "Password do not match", success: '' })

            const res = await axios.post('/user/register',
                JSON.stringify({userName, email , password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser({...user, err: '', success: res.data.msg})
            
            localStorage.setItem('firstLogin', true) // ?

            //console.log(res);
        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: '' })
        }
    }
    return(
        <div className="login_page">
            <h2>Register</h2>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor= "userName">Username</label>
                    <input type="text" placeholder = "Enter username" id = "userName"
                    value={userName} name = "userName" onChange={handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor= "email">Email</label>
                    <input type="text" placeholder = "Enter CUHK email address" id = "email"
                    value={email} name = "email" onChange={handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor= "password">Password</label>
                    <input type="password" placeholder = "Enter password" id = "password"
                    value={password} name = "password" onChange={handleChangeInput}/>
                </div>


                <div>
                    <label htmlFor= "cf_password">Confirm Password</label>
                    <input type="password" placeholder = "Confirm Password" id = "cf_password"
                    value={cf_password} name = "cf_password" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <button type="submit">Register</button> 
                    <Link to="/Login">Alread have an account?</Link>
                    
                </div>
            </form>

        </div>
    )
}


export default Register