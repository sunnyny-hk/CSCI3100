/*
    Description : Admin function

                  page for URL "/editUser/:id"  
                  admin access this page once they click edit button for a particular user on manage page
                  
                  allow admin to change a user's pw/username/role

                  check the format if needed and send request to backend server 
                  by "/user/updateUserName_A/${editUser._id}", "/user/updatePassword_A/${editUser._id}", "/user/updateRole/${editUser._id}" 
                  respectively

                  uses Manage.css
                  
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/10
*/

import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios';
import {showSuccessMsg, showErrMsg} from '../../../utils/notification/notification'
import {isMatch, isLength} from '../../../utils/validation/validation'

const initalState = {
    userName : '',
    password : '',
    cf_password : '',
    checkAdmin: false,
    err: '',
    success: ''
}


function EditUser() {
    
    const {id} = useParams()
 
    const navigate = useNavigate()

    const [data, setData] = useState(initalState)
    const {userName, password, cf_password, checkAdmin, err, success} = data

    //const [err, setErr] = useState('')
    //const [success, setSuccess] = useState('')

    const [editUser, setEditUser] = useState([])
    
    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [num, setNum] = useState(0)

    useEffect(() => {
        if (users.length !== 0){
            users.forEach(user => {
                if (user._id === id){
                    setEditUser(user)
                    setData({...data, checkAdmin: user.role === 1? true: false, err: '', success: ''})
                }
            });
        }else{
            navigate('/manage');
        }
    }, [users, id, navigate])

    const updateUserName =  async () => {
        try {
            
            const res = await axios.patch(`/user/updateUserName_A/${editUser._id}`, 
            JSON.stringify({userName: userName? userName: editUser.userName})
            ,{
                headers: {'Content-Type': 'application/json',Authorization: token},
                withCredentials: true
            })

            setData({...data, err: '', success: res.data.msg})

        } catch (err) {
            err.response.data.msg &&
            setData({...data, err: err.response.data.msg, success: '' })
        }
    }

    const updatePassword = () => {

        if (!isMatch(password, cf_password))
                return setData({...data, err: "Password do not match", success: '' })

        if (isLength(password))
            return setData({...data, err: "Password at least 8 characters", success: '' })
        
        try {
            axios.patch(`/user/updatePassword_A/${editUser._id}`, JSON.stringify({
                password
            }), {
                headers: {'Content-Type': 'application/json',Authorization : token}
            })

            setData({...data, err: '', success: 'Update Success'})
        } catch (err) {
            console.log(err)
            setData({...data, err: err.response.data.mag, success})
        }
    }

    const handleChange = e => {
        
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    
    }

    const handleUpdateRole = async () => {
        try {
            if(num % 2 !== 0){
                const res = await axios.patch(`/user/updateRole/${editUser._id}`, JSON.stringify({
                    role: checkAdmin ? 1 : 0
                }), {
                    headers: {'Content-Type': 'application/json',Authorization: token}
                })

                setData({...data, err: '', success: res.data.msg})
                setNum(0)
            }
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const handleCheck = () =>{
        setData({...data, checkAdmin: !checkAdmin, err:'', success: ''})
        setNum(num + 1)
    }

    
 
    return (
        <div className='profile_page edit_user'>
            <div className='row'>
                <button onClick={() => navigate(-1)} className= 'go_back'>
                    <i className="fa-solid fa-arrow-left"></i>Go back
                </button>
            </div>
                

            <div className= "all">
                <h2>EditUser</h2>
                
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <div className="form-group">
                    <label htmlFor="userName">New Username</label>
                    <input type="text" name="userName" id="userName" defaultValue={editUser.userName}
                    placeholder="Your new username" onChange={handleChange} />
                </div>

                <button onClick={updateUserName}>Update UserName</button>

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

                <button onClick={updatePassword}>Update Password</button>

                <div className="form-group">
                    <input type="checkbox" id="isAdmin" checked={checkAdmin} 
                    onChange={handleCheck}/>
                    <label htmlFor="isAdmin">Admin</label>
                </div>

                <button onClick={handleUpdateRole} className = 'button admin'>Update Role</button>

            </div>
        </div>
    );
}

export default EditUser;