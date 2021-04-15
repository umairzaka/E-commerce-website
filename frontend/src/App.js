import react from 'react'

import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';



function App() {
  return (
    <BrowserRouter>
   
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">amazona</a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signIn">Sign In</a>
        </div>
      </header>
      <main>
      <Route path='/products/:id' component={ProductScreen}/>
           <Route path='/' component={HomeScreen} exact/>
            
        
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
