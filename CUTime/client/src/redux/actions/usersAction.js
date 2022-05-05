/*
    Description : action on getting all user -> payload is info for all user
                    ie after sending a action (dispatch), reducer should store the payload to the respective state
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/5/5
*/

import ACTIONS from './index'
import axios from 'axios'

// request server for all user info
export const fetchAllUser = async (token) => {
    
    const res = await axios.get('/user/allInfor', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetAllUser = (res) => {
    
    return {
        type: ACTIONS.GET_ALL_USERS, 
        payload: res.data
    }
    
}