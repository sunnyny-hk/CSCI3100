/*
    Description : page for URL "/forgotPassword"  
                  user access this page once they click forgot password? button on login page
                  require input for their CUHK email
                  check the format and send request to backend server by "/user/resetPassword"

                  uses auth.css
                  
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/8
*/

import React, { useState } from 'react';
import axios from 'axios';
import {isEmail} from '../../utils/validation/validation'
import {showErrMsg,showSuccessMsg} from '../../utils/notification/notification'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {

    const [data, setData] = useState(initialState)

    const {email, err,success} = data

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setData({...data, [name]:value, err: '',success: ''})
    }

    const forgotPassword = async ()=> {
        if (!isEmail(email))
            return setData({...data, err: 'Invalid email', success: ''})

        try {
            const res = await axios.post('/user/forgotPassword', JSON.stringify({email}),{
                headers: {'Content-Type': 'application/json'}
            })
            
            setData({...data, err: '', success: res.data.msg})
        }catch (err){
            err.response.data.msg && setData({...data, err: 'Invalid email', success: ''})
        }
    }

    return (
        <div className='fg_pw'>
            <h2>Forgot Your Password?</h2>

            <div className='row'>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor='email'>Enter your CUHK email address</label>
                <input type="email" name="email" id="email" value={email} onChange = {handleChangeInput}/>
                <button onClick = {forgotPassword}>Verify your email</button> 
            </div>
        </div>
    );
}

export default ForgotPassword;