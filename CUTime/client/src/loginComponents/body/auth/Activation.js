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