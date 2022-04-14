import React, { useState } from 'react';
import axios from 'axios';
import {showErrMsg,showSuccessMsg} from '../../utils/notification/notification'
import {isMatch, isLength} from '../../utils/validation/validation'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';

const initialState ={
    password: '',
    cf_pasword: ''
}

function ResetPassword() {

    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setData({...data, [name]: value, err:  '',success: '' })
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if (!isMatch(password, cf_password))
                return setData({...data, err: "Password do not match", success: '' })

            if (isLength(password))
                return setData({...data, err: "Password at least 8 characters", success: '' })

            const res = await axios.post('/user/resetPassword',
                JSON.stringify({password}),
                {
                    headers: { 'Content-Type': 'application/json',Authorization: token },
                    
                }
            );
            setData({...data, err: '', success: res.data.msg})
            
        } catch (err) {
            err.response.data.msg &&
            setData({...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <div className="login_page">
            <h2>Reset Password</h2>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>

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
                    <button type="submit">Confirm</button> 
                    <Link to="/Login">Login Now!</Link>
                    
                </div>
            </form>

        </div>
    );
}

export default ResetPassword;