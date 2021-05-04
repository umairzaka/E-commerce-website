import Axios from "axios"
import { ADD_CART_ITEM, CART_SAVE_PAYMENT_METHED, CART_SAVE_SHIPPING_ADDRESS, REMOVE_CART_ITEM } from "../constants/cartConstants";

export const addToCard = (productId, qty) => async (dispatch, getState)=> {

    const {data} = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type:ADD_CART_ITEM,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            seller: data.seller,
            qty
        }
    })
    
    localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItem));

}


export const removeToCard = (productId) => (dispatch,getState) => {
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:productId,
    })
    localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItem));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


export const SavePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_PAYMENT_METHED,
        payload:data
    })
}