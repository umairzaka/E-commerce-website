// import react from 'react'

import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';



function App() {

    const cart = useSelector(state => state.cart)
    const { cartItem } = cart;

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
          <Link to="/signIn">Sign In</Link>
        </div>
      </header>
      <main>
        <Route path='/cart/:id?' component={CartScreen}/>
          <Route path='/products/:id' component={ProductScreen}/>
           <Route path='/' component={HomeScreen} exact/>
            
        
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
