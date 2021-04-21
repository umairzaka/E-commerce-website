import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGOUT, USER_REGISTRATION_FAIL, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

//  ..........................registration ........

export const registrationReducers = (state ={} , action) => {
    switch (action.type) {
        case USER_REGISTRATION_REQUEST:
            return {loading : true}     
        case USER_REGISTRATION_SUCCESS:
            return { loading : false , userInfo:action.payload}
        case USER_REGISTRATION_FAIL:
            return { loading: false , error: action.payload}  
        default:
            return state
    }
} 


// ..............SIGN IN

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


// ............... user profile detail..

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};