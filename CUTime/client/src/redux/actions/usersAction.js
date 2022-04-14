import ACTIONS from './index'
import axios from 'axios'


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