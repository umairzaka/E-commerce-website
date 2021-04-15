import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import data from '../Data'
  
function ProductScreen(props) {

    const product = data.products.find(x => x._id === props.match.params.id)
    if (!product) {
        return <div className='row'>
            <h1> No Product</h1>
        </div>
    }
    return (
        <div>
            
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
        </div>
    )
}

export default ProductScreen
