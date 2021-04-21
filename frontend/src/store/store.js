import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';     
import { cardReducer } from '../Reducers/CartReducers';
import { orderDetailReducer, orderMineListReducer, orderPayReducer, orderReducer } from '../Reducers/OrderReducer';

import { productDetailReducer, productListReducer } from '../Reducers/productsReducer';
import { registrationReducers, userDetailsReducer, userReducers } from '../Reducers/userReducers';

const initialState = {
    userSignin:{
        userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },

    cart:{
        cartItem : localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod : 'paypal'
    }

};
const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailReducer,
    cart : cardReducer, 
    userSignin: userReducers,
    userRegistration: registrationReducers,
    createdOrder : orderReducer,
    orderDetails : orderDetailReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const store = createStore(  reducer, initialState  , composeEnhancer(applyMiddleware(thunk)))

export default store