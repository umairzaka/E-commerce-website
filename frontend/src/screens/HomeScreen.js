import React, { useEffect } from 'react'
import Products from '../components/Products'
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts  } from '../actions/ProductsAction';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList)
    const { loading , error , products} = productList;

   
    useEffect(() => {
      dispatch(listProducts());
    }, [dispatch]);

    return (
         <div>
             {
                 loading ? ( <Loading></Loading> )
                 : error ? ( <MessageBox>{error}</MessageBox> )
                 : 
                 (
                    <div className="row center">
                        {
                            products.map(product => (
                            <Products key={product._id} product={product} />
                            ))
                        }
                    </div>
                 )
             }
            
      </div>
    )
}

export default HomeScreen
