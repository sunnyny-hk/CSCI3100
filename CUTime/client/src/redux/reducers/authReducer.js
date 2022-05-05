/*
    Description : reducer for authentication 
                    ie control state of current user info, whether user is logged in and whether user is an admin
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/10
*/

import ACTIONS from '../actions'

const initialState = {
    user : [],
    isLogged: false,
    isAdmin: false
}

const authReducer = (state = initialState, action) =>{
    switch (action.type){
        case ACTIONS.LOGIN:
            return{
                ...state,
                isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin
            }
        default:
            return state
    }
}

export default authReducer
