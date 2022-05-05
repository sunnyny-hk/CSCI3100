/*
    Description : module that show response of the server 
                  uses notification.css
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/5
*/

import React from 'react'
import './notification.css'

export const showErrMsg = (msg) => {
    return <div className="errMsg">{msg}</div>
}

export const showSuccessMsg = (msg) => {
    return <div className="successMsg">{msg}</div>
}