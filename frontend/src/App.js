// import react from 'react'

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./actions/UserActions";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import CartScreen from "./screens/CartScreen";
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import SignScreen from "./screens/SignScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderlistScreen from "./screens/OrderlistScreen";
import UsersScreen from "./screens/UsersScreen";
import EditUserScreen from "./screens/EditUserScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";



function App() {

    const cart = useSelector(state => state.cart)
    const { cartItem } = cart;

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const dispatch = useDispatch()

    const signoutHandler =() => {
      dispatch(signOut())
    }


  return (
    <BrowserRouter>
   
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
          <Link to="/cart">Cart
            {
              cartItem.length > 0 && (
                <span className='badge'>{cartItem.length}</span>
              )
            }
          
          </Link>
          {
            userInfo ? (
              <div className='dropdown'>
                <Link to='#'>{userInfo.name} <i className='fa fa-caret-down'></i></Link>
                  <ul className='dropdown-content'>
                    <li>
                      <Link to='/orderhistory'>Order History</Link>
                    </li>
                    <li>
                      <Link to='/Profile'>Mine Pofile</Link>
                    </li>
                     <li>
                      <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                    </li>
                  </ul>
              </div>
           
            ):(
              <Link to="/signin">Sign In</Link>
            )
          }
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          
        </div>
      </header>
      <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route path='/products/:id' component={ProductScreen}/>
          <Route path='/signin' component={SignScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/payment' component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/order/:id' component={OrderDetailScreen}></Route>
          <Route path='/orderhistory' component={OrderHistoryScreen}></Route> 
          <PrivateRoute path='/profile' component={ProfileScreen}></PrivateRoute> 
          <AdminRoute path='/productlist' component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path='/product/:id/edit' component={ProductEditScreen} ></AdminRoute>
          <AdminRoute path='/orderlist' component={OrderlistScreen} exact></AdminRoute>
          <AdminRoute path='/userlist' component={UsersScreen}></AdminRoute>
          <AdminRoute path='/user/:id/edit' component={EditUserScreen}></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderlistScreen}></SellerRoute>
          <Route path='/' component={HomeScreen} exact/>    
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
