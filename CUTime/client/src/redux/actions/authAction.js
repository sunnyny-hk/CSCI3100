/*
    Description : action on login (user logged in) -> tell reducer to store state (islogged => true)
                  action on get current user by sending request to backend server -> tell reducer to store state (user)
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/5/5
*/

import ACTIONS from './index'
import axios from 'axios'


export const dispatchLogin = () => {
    return{
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    
    const res = await axios.get('/user/infor', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetUser = (res) => {
    
    return {
        type: ACTIONS.GET_USER, 
        payload:{
            user: res.data,
            isAdmin: res.data.role === 1? true : false
        }
    }
    
}