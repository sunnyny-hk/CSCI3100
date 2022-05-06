/*
    Description : Admin function

                  page for URL "/manage"

                  use redux to store all user information ie sending action -> reducer receive action and change tha state)

                  admin access this page once they click edit button for a particular user on manage page
                  
                  allow admin view information for all user and edit/delete a particular user

                  link admin to "/edit" if they click the edit button
                  delete a particular user by sending request to backend server "/user/delete/${id}"
                  
                  uses Manage.css
                  
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/10

    Reference : (setting up admin manage) https://www.youtube.com/watch?v=npsi7ZkjvQo for using react-redux, setting table by mapping all user info in js
*/

import React, {useState, useEffect} from "react";
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useResolvedPath} from 'react-router-dom'
import {isMatch, isLength} from '../../../utils/validation/validation'
import {showErrMsg, showSuccessMsg} from '../../../utils/notification/notification'
import {fetchAllUser, dispatchGetAllUser} from '../../../../redux/actions/usersAction'


function Manage() {

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    const {user} = auth

    const [callback, setCallback] = useState(false)

    const [loading, setLoading] = useState(false)

    const [err, setErr] = useState('')

    const [success, setSuccess] = useState('')

    useEffect(() => {
            fetchAllUser(token).then(res => {
                dispatch(dispatchGetAllUser(res))
            })
    },[token, dispatch, callback])

    // when user press the delete button (image)
    const handleDelete = async (id, userName) =>{
        try {
            console.log(id, userName)
            if (window.confirm(`Are you sure you want to delete this account, username: ${userName}?`)){

                setLoading(true)

                const res = await axios.delete(`/user/delete/${id}`, {
                    headers: {Authorization: token}
                })

                setTimeout(() => { setLoading(false)}, 2000);
                setCallback(!callback)

                setSuccess(res.data.msg)
                setErr('')
            }
        } catch (err) {
            setTimeout(() => { setLoading(false)}, 2000);

            setErr(err.response.data.msg)
            setSuccess('')
        }
    }


    return (
        <div>
            <div className= 'manage_page'>
                <h2>Users List</h2>

                {loading&&<h3>Deleting user...Please wait</h3>}
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <div style={{overflowX : "auto"}}>
                    <table className='users'>
                        <thead>
                            <th>ID</th>
                            <th>User name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </thead>
                    
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{
                                            user.role === 1
                                            ?<i className="fa-solid fa-check" title="Admin"></i>
                                            :<i className="fa-solid fa-xmark" title="User"></i>
                                        }</td>
                                        <td>
                                            <Link to = {`/editUser/${user._id}`}>
                                                <i className = "fa-solid fa-user-pen" title="Edit"></i>
                                            </Link>
                                            <i className="fa-solid fa-trash-can" title="Remove"
                                            onClick = {() => handleDelete(user._id, user.userName)}></i> 
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Manage;