/*
    Description : reducer for controlling state of token 
                    ie when user login, the state of token should be stored
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/10
*/
import ACTIONS from "../actions";

const token = ""

const tokenReducer = (state = token, action) =>{
    switch(action.type){
        case ACTIONS.GET_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default tokenReducer