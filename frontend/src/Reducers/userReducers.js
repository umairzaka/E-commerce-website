import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGOUT, USER_REGISTRATION_FAIL, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,  USER_TOPSELLERS_LIST_FAIL,  USER_TOPSELLERS_LIST_REQUEST,  USER_TOPSELLERS_LIST_SUCCESS,  USER_UPDATE_FAIL,  USER_UPDATE_PROFILE_FAIL,  USER_UPDATE_PROFILE_REQUEST,  USER_UPDATE_PROFILE_RESET,  USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS} from "../constants/userConstants";

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
    case USER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

// .......... user update profile ........

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

// fetch user list for admin  

export const listUserReducer = (state={ loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST: 
      return{loading:true}
    case USER_LIST_SUCCESS:
      return{loading:false , users:action.payload}
    case USER_LIST_FAIL:
      return {loading :false , error:action.payload}
    default:
      return state
  }
}

// delete user from users list for admin  func

export const deleteUserReducer = (state={}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {loading:true}
    case USER_DELETE_SUCCESS:
      return {loading:false, success: true}
    case USER_DELETE_FAIL:
      return {loading : true, error: action.payload}
    case USER_DELETE_RESET:
      return {}
    default:
      return state
  }
}

// update user from users list for admin  func


export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
 
// top seller List Slider

export const userTopSellerListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_TOPSELLERS_LIST_REQUEST:
      return { loading: true };
    case USER_TOPSELLERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_TOPSELLERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};