import Axios from "axios"
import { ADD_CART_ITEM } from "../constants/cartConstants";

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
            qty
        }
    })
    
    localStorage.setItem('cartItem',JSON.stringify(getState().cart.cartItem));

}