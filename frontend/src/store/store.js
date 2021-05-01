import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';     
import { cardReducer } from '../Reducers/CartReducers';
import { orderDeliverReducer, orderDetailReducer, orderListDeleteReducer, orderlistReducer, orderMineListReducer, orderPayReducer, orderReducer } from '../Reducers/OrderReducer';

import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from '../Reducers/productsReducer';
import { deleteUserReducer, listUserReducer, registrationReducers, userDetailsReducer, userReducers, userUpdateProfileReducer, userUpdateReducer } from '../Reducers/userReducers';

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
    productDetails: productDetailsReducer,
    cart : cardReducer, 
    userSignin: userReducers,
    userRegistration: registrationReducers,
    createdOrder : orderReducer,
    orderDetails : orderDetailReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderlistReducer,
    orderDelete:orderListDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: listUserReducer,
    userDelete: deleteUserReducer,
   
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const store = createStore(  reducer, initialState  , composeEnhancer(applyMiddleware(thunk)))

export default store