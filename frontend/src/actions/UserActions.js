import Axios from "axios";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGOUT, USER_REGISTRATION_FAIL, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS ,USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL} from "../constants/userConstants"


// .........................Registration..

export const registration = (name,email,password) => async (dispatch) => {
    dispatch({
        type:USER_REGISTRATION_REQUEST,
        payload: {email,password}
    });
    try {
        const {data} = await Axios.post('/api/users/register' , {name,email, password});
        dispatch({
            type:USER_REGISTRATION_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data));
    } catch (error) {
        dispatch({
            type:USER_REGISTRATION_FAIL,
            payload:error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
    }
}




    ///// ..................... SIGN In 

export const signin = (email,password) => async (dispatch) => {
    dispatch({
        type:USER_SIGNIN_REQUEST,
        payload: {email,password}
    });
    try {
        const {data} = await Axios.post('/api/users/signin' , {email, password});
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data));
    } catch (error) {
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload:error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
    }
}

// ...................... Sign Out

export const signOut = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItem')
    localStorage.removeItem('shippingAddress')
    dispatch({
        type:USER_LOGOUT,
    })
    document.location.href = '/signin';
}

// ............. user profile deatil..
export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

// update user
export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};


// fetch users  list for admin functionality 

export const listUsers = () => async(dispatch,getState) => {
  dispatch({
    type:USER_LIST_REQUEST
  })
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const {data} = await Axios.get('/api/users' ,{
       headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({type:USER_LIST_SUCCESS , payload: data})
  } catch (error) {
     const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({type:USER_LIST_FAIL , payload:message})
  }
}
// delete user from users  list for admin functionality

export const deleteUser = (userId) => async (dispatch , getState) => {
  dispatch ({
    type:USER_DELETE_REQUEST,
    payload : userId
  })
   const {
    userSignin: { userInfo },
  } = getState();
  try {
    const {data} = await Axios.delete(`/api/users/${userId}` ,{
       headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({type:USER_DELETE_SUCCESS , payload: data})
  } catch (error) {
     const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({type:USER_DELETE_FAIL , payload:message})
  }
}

// update user from users  list for admin functionality

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};