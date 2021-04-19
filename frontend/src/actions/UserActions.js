import Axios from "axios";
import { USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants"

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
            payload: error.response && error.response.data.messsage ? error.response.data.messsage : error.messsage
        })
    }
}

export const signOut = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItem')
    dispatch({
        type:USER_LOGOUT,
    })
}