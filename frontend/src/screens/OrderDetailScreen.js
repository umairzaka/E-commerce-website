import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailOrder } from '../actions/OrderAction'
import Loading from '../components/Loading'
import MessageBox from '../components/MessageBox'

function PlaceOrderScreen(props) {

  const orderId = props.match.params.id
  const dispatch = useDispatch()
   const orderDetails = useSelector(state => state.orderDetails)
   const { loading , error , order } = orderDetails
  


  useEffect(() => {
    dispatch(detailOrder(orderId))
  }, [dispatch,orderId])


  return loading ? (<Loading></Loading>) : error ? (<MessageBox>{error}</MessageBox>) : (
    <div>
     
         <h1>Order / {order._id}</h1>
        <div className='row top'>
          
          <div className='col-2'>
             <ul>
              <li>
                <div className='card card-body'>
                    <h2>Shipping Info</h2>
                    <p>
                      <strong>Name :</strong> {order.shippingAddress.fullName} <br/>
                      <strong>Address :</strong> {order.shippingAddress.address} , {order.shippingAddress.city} , {order.shippingAddress.postalCode} , {order.shippingAddress.country}
                    </p>
                    {
                      order.isDelivered ? <MessageBox variant='success'>Delivered</MessageBox> 
                      : <MessageBox variant='danger'>Not Delivered</MessageBox>
                    }
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Payment :</strong> {order.paymentMethod}
                  </p>
                    {
                      order.isPaid ? <MessageBox variant='success'>Payment done</MessageBox> 
                      : <MessageBox variant='danger'>Not paid</MessageBox>
                    }
                </div>
              </li>
              
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {order.orderItem.map((item) => (
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
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
        </div>             

        </div>
                        
    </div>
  )
}

export default PlaceOrderScreen
