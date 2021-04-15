import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Products from '../components/Products'
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

function HomeScreen() {
     
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false)

    useEffect(() => {
      const fetchData = async () => {

        try {
          setloading(true)
          const {data} = await axios.get('/api/products');
          setloading(false)
          setproducts(data);
        } catch (err) {
            seterror(err.message);
            setloading(false);
        }
          
      }
      fetchData();
    }, [])

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
