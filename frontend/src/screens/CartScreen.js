import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCard, removeToCard } from '../actions/CartAction';
import MessageBox from '../components/MessageBox';

function CartScreen(props) {
     const productId = props.match.params.id;
     const qty = props.location.search ? Number(props.location.search.split('=')[1]) :1;

     const cart = useSelector(state => state.cart)
     const {cartItem} = cart;


     const dispatch = useDispatch();

     useEffect(() => {
        if (productId) {
            dispatch(addToCard(productId, qty))
        }
     }, [])

     const removeFromCartHandler = (id) => {
        dispatch(removeToCard(id))
     }

     const checkOutHandler = () => {
        props.history.push('/signIn?redirect=shipping')
     }

    return (
        <div className='row top'>
            
            <div className='col-2'>
                <div className='row'>
                    <div>
                        <h1>Shopping cart</h1>
                    </div>
                    <div>
                        {
                        cartItem != 0  ? (
                             <Link  to={'/'}> <h2> <i className="fa fa-arrow-left" aria-hidden="true"></i> Shoping More</h2></Link> 
                        ):
                         (
                             <h1> <i className="fa fa-arrow-left" aria-hidden="true"></i></h1>
                         )
                        } 
                        
                    </div>
                </div>
                
                {
                    cartItem.length === 0? <MessageBox>
                        Cart is Empaty <Link to='/'>Go to Shopping</Link>
                    </MessageBox>
                    : (
                       <>
        
                        <ul>
                            {
                                cartItem.map((item)=> (
                                    <li key={item.product}>
                                        <div className='row'>
                                            <div>
                                                <img src={item.image} alt={item.name} className='img-sml'/>
                                            </div>
                                            <div>
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} 
                                                onChange={e => dispatch(addToCard(item.product,Number(e.target.value)))}
                                                >
                                            {
                                               [...Array(item   .countInStock).keys()].map(
                                                   (x)=> (
                                                       <option key={x+1} value={x+1}>{x+1}</option>
                                                   )
                                               )
                                             }        
                                                </select>
                                            </div>
                                            <div>
                                                <p>${item.price}</p>
                                            </div>
                                            <div>
                                                <button onClick={() => removeFromCartHandler(item.product)} type='button' className='button'>Detelte</button>
                                            </div>
                                        </div>
                                    </li>
                                ))           
                            }
                        </ul>
                        </>
                    )
                }
            </div>

            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItem.reduce((a,c) => a + c.qty, 0)} items) : $ 
                                {cartItem.reduce((a, c) => a +c.price * c.qty , 0)}
                            </h2>
                        </li>
                        <li>
                            <div>
                                <button disabled={cartItem.length === 0} className='primary block' 
                                    onClick={checkOutHandler}
                                >Check Out</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen
