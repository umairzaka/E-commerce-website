import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';     
import { cardReducer } from '../Reducers/CartReducers';

import { productDetailReducer, productListReducer } from '../Reducers/productsReducer';

const initialState = {

    cart:{
        cartItem : localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
    }

};
const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailReducer,
    cart : cardReducer, 
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const store = createStore(  reducer, initialState  , composeEnhancer(applyMiddleware(thunk)))

export default store