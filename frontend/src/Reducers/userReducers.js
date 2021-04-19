import { USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

export const userReducers = (state ={} , action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading : true}
           
        case USER_SIGNIN_SUCCESS:
            return { loading : false , userInfo:action.payload}

        case USER_SIGNIN_FAIL:
            return { loading: false , error: action.payload}
        case USER_LOGOUT :
            return {}    
        default:
            return state
    }
} 