import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/notification'
import axios from 'axios'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const initalState = {
    userNameEmail: '',
    password: '',
    err: '',
    success: ''
}

function Login(){
    const [user, setUser] = useState(initalState)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const {userNameEmail, password, err, success} = user

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUser({...user, [name]: value, err:  '',success: '' })
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('/user/login',
                JSON.stringify({userNameEmail, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser({...user, err: '', success: res.data.msg})
            
            localStorage.setItem('firstLogin', true) // ? for token

            dispatch(dispatchLogin()) // ? (redux) isLogged => true

            navigate("/") // redirect to "/"


            //console.log(res);
        } catch (err) {
            
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: '' })
        }
    }
    return(
        <div className="login_page">
            <h2>Login</h2>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor= "userNameEmail">Email/Username</label>
                    <input type="text" placeholder = "Enter CUHK email address / username" id = "userNameEmail"
                    value={userNameEmail} name = "userNameEmail" onChange={handleChangeInput}/>
                </div>

                <div>
                    <label htmlFor= "password">Password</label>
                    <input type="password" placeholder = "Enter password" id = "password"
                    value={password} name = "password" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <button type="submit">Login</button> 
                    <Link to="/forgotPassword">Forgot your password</Link>
                </div>
            </form>
        </div>
    )
}


export default Login