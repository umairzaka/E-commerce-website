import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckOutStep from '../components/CheckOutStep'

function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart)

  if (!cart.shippingAddress.address) {
    props.history.push('/signin')
  }

   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItem.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = () => {
    // TODO: dispatch place order action
  };



  return (
    <div>
       <CheckOutStep step1 step2 step3 step4></CheckOutStep>

        <div className='row top'>
          <div className='col-2'>
             <ul>
              <li>
                <div className='card card-body'>
                    <h2>Shipping Info</h2>
                    <p>
                      <strong>Name :</strong> {cart.shippingAddress.fullName} <br/>
                      <strong>Address :</strong> {cart.shippingAddress.address} , {cart.shippingAddress.city} , {cart.shippingAddress.postalCode} , {cart.shippingAddress.country}
                    </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Payment :</strong> {cart.paymentMethod.paymentMethod}
                  </p>
                </div>
              </li>
              
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {cart.cartItem.map((item) => (
                        <li key={item.product}>
                          <div className="row">
                            <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="img-sml"
                              ></img>
                            </div>
                            <div className="min-30">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>

                            <div>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
            </ul>
          </div> 
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItem.length === 0}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>             

        </div>
                        
    </div>
  )
}

export default PlaceOrderScreen
