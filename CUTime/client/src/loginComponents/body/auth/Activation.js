/*
    Description : page for URL "/user/activate/:activation_token"  
                  user access this page once they click the acctivation link with token from their email after they register
                  inform user whether the account has successfully register or not 
                  send request to backend server by "/user/forgotPassword"

                  uses auth.css
                  
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/8
*/

import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/notification'
import axios from 'axios'


function Activation() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect (() =>{
        if (activation_token){
            const activationEmail = async () =>{
                try {
                    const res = await axios.post('/user/activation',
                    JSON.stringify({activation_token}),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    }, [activation_token])
    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {success && <Link to= "/Login"><h2>Click here to Login Now!</h2></Link>}

            
        </div>
    );
}

export default Activation;