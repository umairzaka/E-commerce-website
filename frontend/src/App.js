import react from 'react'
import Data from './Data'

function App() {
  return (
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
        <div>
          <div className="row center">
            {
              Data.products.map(product => (
                <div className="card">
                <a href={`/products/${product._id}`}>
                 
                  <img className="medium" src={product.image} alt={product.name} />
                </a>
                <div className="card-body">
                  <a href={`/products/${product._id}`} >
                    <h2>{product.name}</h2>
                  </a>
                  <div className="rating">
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                  </div>
                  <div className="price">${product.price}</div>
                </div>
              </div>
              ))
            }

            
          
          </div>
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
