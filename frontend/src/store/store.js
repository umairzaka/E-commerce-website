import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';     

import { productDetailReducer, productListReducer } from '../Reducers/productsReducer';

const initialState = {};
const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const store = createStore(  reducer, initialState  , composeEnhancer(applyMiddleware(thunk)))

export default store