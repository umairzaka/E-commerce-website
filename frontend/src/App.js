// import react from 'react'

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./actions/UserActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import SignScreen from "./screens/SignScreen";



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
                      <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                  </ul>
              </div>
           
            ):(
              <Link to="/signin">Sign In</Link>
            )
          }
          
        </div>
      </header>
      <main>
        <Route path='/cart/:id?' component={CartScreen}/>
          <Route path='/products/:id' component={ProductScreen}/>
            <Route path='/signin' component={SignScreen}/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/shipping' component={ShippingScreen}></Route>
           <Route path='/' component={HomeScreen} exact/>
            
        
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
