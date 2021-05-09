import React, { useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Products from '../components/Products'
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts  } from '../actions/ProductsAction';
import { listTopSellers } from '../actions/UserActions';
import { Link } from 'react-router-dom';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList)
    const { loading , error , products} = productList;

    const userTopSellersList = useSelector((state) => state.userTopSellersList);
    const {
        loading: loadingSellers,
        error: errorSellers,
        users: sellers,
    } = userTopSellersList;

   
    useEffect(() => {
      dispatch(listProducts({}));
      dispatch(listTopSellers());
    }, [dispatch]);

    return (
         <div>
             <h2>Top Sellers</h2>
                {loadingSellers ? (
                    <Loading></Loading>
                ) : errorSellers ? (
                    <MessageBox variant="danger">{errorSellers}</MessageBox>
                ) : (
                    <>
                    {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                    <Carousel showArrows autoPlay showThumbs={false}>
                        {sellers.map((seller) => (
                        <div key={seller._id}>
                            <Link to={`/seller/${seller._id}`}>
                            <img src={seller.seller.logo} alt={seller.seller.name} />
                            <p className="legend">{seller.seller.name}</p>
                            </Link>
                        </div>
                        ))}
                    </Carousel>
                    </>
                )}
                <h2>Featured Products</h2>
             {
                 loading ? ( <Loading></Loading> )
                 : error ? ( <MessageBox variant="danger">{error}</MessageBox> )
                 : 
                 (
                     <>
                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                    <div className="row center">
                        {
                            products.map(product => (
                            <Products key={product._id} product={product} />
                            ))
                        }
                    </div>
                    </>
                 )
             }
            
      </div>
    )
}

export default HomeScreen
