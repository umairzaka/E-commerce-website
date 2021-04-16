import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/ProductsAction'
import Loading from '../components/Loading'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'

  
function ProductScreen(props) {
    const productId = props.match.params.id;
    const dispatch= useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    
    const { loading , error , product} = productDetails ;

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId ])
   
    return (
        <div>

            {
                 loading ? ( <Loading></Loading> )
                 : error ? ( <MessageBox>{error}</MessageBox> )
                 : 
                 (
                    <div className='row top'>
                        <Link to='/'>back</Link>
                        <div className='col-2'>
                            <img className='large' src={product.image} alt={product.image} />
                        </div>
                        <div className='col-1'>
                            <ul>
                                <li>
                                    {product.name}
                                    </li>   
                                    <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
                                    <li>${product.price}</li>
                                    <li>Describtion : {product.description}</li>
                            </ul>
                        </div>
                        <div className='col-1'>
                            <div className='card card-body'>
                                <ul>
                                    <li>
                                        <div className='row'>
                                            <div>
                                                price
                                            </div>
                                            <div className='price'>
                                                {product.price}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>
                                                Status
                                            </div>
                                            <div className='price'>
                                                {product.countInStock > 0 ? (<span className='success'>Available</span> )
                                                : (<span className='error'>Unavailable</span>) }
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button className='primary block'>Add to cart</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                 )
             }
            
           
        </div>
    )
}

export default ProductScreen
