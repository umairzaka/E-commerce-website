import { ADD_CART_ITEM, CART_SAVE_SHIPPING_ADDRESS, REMOVE_CART_ITEM } from "../constants/cartConstants";


export const cardReducer = (state = {cartItem : []} ,action)=> {

    switch (action.type) {
        case ADD_CART_ITEM:
            const item = action.payload;
            const exitItem = state.cartItem.find(x => x.product === item.product );
            if (exitItem) {
                return {
                    ...state,
                    cartItem : state.cartItem.map(x => x.product === exitItem.product ? item : x)
                }
            } else {
                return {...state , cartItem : [...state.cartItem, item]}
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItem: state.cartItem.filter((x) => x.product !== action.payload),
            }
        
        case CART_SAVE_SHIPPING_ADDRESS: 
        return {
            ...state,
            shippingAddress: action.payload
        }
        default:
            return state

    }
}