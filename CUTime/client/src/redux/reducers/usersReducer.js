/*
    Description : reducer for getting all user 
                    ie control state of info of all users for admin operations
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/10
*/

import ACTIONS from '../actions'

const users = []

const usersReducer = (state = users, action) =>{
    switch (action.type){
        case ACTIONS.GET_ALL_USERS:
            return action.payload
        default:
            return state
    }
}

export default usersReducer
