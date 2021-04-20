import Axios from "axios";
import { USER_LOGOUT, USER_REGISTRATION_FAIL, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants"


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
}