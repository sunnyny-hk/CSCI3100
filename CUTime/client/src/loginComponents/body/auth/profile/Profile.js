/*
    Description : Common user function

                  page for URL "/profile"

                  Allow user change their username/ password/ icon
                  
                  uses Profile.css
                  
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/10

    Reference : (setting up profile) https://www.youtube.com/watch?v=npsi7ZkjvQo for file processing, react-redux in js
*/
import React, {useState, useEffect} from "react";
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isMatch, isLength} from '../../../utils/validation/validation'
import {showErrMsg, showSuccessMsg} from '../../../utils/notification/notification'

const initalState = {
    userName : '',
    password : '',
    cf_password : '',
    err: '',
    success: ''
}

function Profile() {

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user} = auth
    const [data, setData] = useState(initalState)
    const {userName, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        
            const {name, value} = e.target
            setData({...data, [name]:value, err:'', success: ''})
        
    }

    const changeAvatar = async (e) =>{
        e.preventDefault()

        try{
            const file = e.target.files[0]

            if (!file) return setData({...data, err: "No files were Uploaded", success: ''})
            
            if(file.size > 1024 * 1024){
                setData({...data, err: "Size too large", success: ''})
            } // 1mb

            if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
                setData({...data, err: "File format is incorrect.", success: ''})
            }
            
            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)

            const res = await axios.post('/api/uploadImage', formData, {
                headers : {'content-type': 'multipart/form-data', Authorization: token}
            })
            
            setTimeout(() => { setLoading(false)}, 3000);

            setAvatar(res.data.url)
            
            setData({...data, err: '', success: 'Update Success'})

        }catch (err){

            setTimeout(() => { setLoading(false)}, 3000);

            setTimeout(() => {setData({...data, err: err.response.data.mag, success: ''})}, 3000);
        }

    }

    const updatePassword = () => {

        if (!isMatch(password, cf_password))
                return setData({...data, err: "Password do not match", success: '' })

        if (isLength(password))
            return setData({...data, err: "Password at least 8 characters", success: '' })
        
        try {
            axios.post('/user/resetPassword', 
            JSON.stringify({password})
            ,{
                headers: {'Content-Type': 'application/json',Authorization : token},
                withCredentials: true
            })

            setData({...data, err: '', success: 'Update Success'})
        } catch (err) {
            console.log(err)
            setData({...data, err: err.response.data.mag, success})
        }
    }

    const updateUserName =  async () => {
        try {
            //console.log(userName)
            const res = await axios.patch('/user/updateUserName', 
            JSON.stringify({userName: userName? userName: user.userName})
            ,{
                headers: {'Content-Type': 'application/json', Authorization: token},
                withCredentials: true
            })

            setData({...data, err: '', success: res.data.msg})

        } catch (err) {
            err.response.data.msg &&
            setData({...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <>

        <div className="profile_page">
            <div className= "all">
                <h2>User Profile</h2>
                
                <div className="avatar">

                    <img src = {avatar? avatar: user.image} alt = ""/>
                    <h3>Change Your Icon</h3> 
                     <em> *Only JPG format </em><i className ="fa-solid fa-image"></i> <em> * </em>
                    <input type = "file" name ="file" id = "file_up" onChange={changeAvatar}/>
                    
                </div>
                {loading&&<h3>Uploading image...Please wait</h3>}
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <div className="form-group">
                    <label htmlFor="userName">New Username</label>
                    <input type="text" name="userName" id="userName" defaultValue={user.userName}
                    placeholder="Your new username" onChange={handleChange} />
                </div>

                <button disabled = {loading} onClick={updateUserName}>Update UserName</button>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name = "password" id="password"
                    placeholder="Your New password" value={password}
                    onChange={handleChange}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name = "cf_password" id="cf_password"
                    placeholder="confirm password" value={cf_password} 
                    onChange={handleChange} />
                </div>

                
                
                <button disabled = {loading} onClick={updatePassword}>Update Password</button>

            </div>

        </div>
        </>
    );
}

export default Profile;