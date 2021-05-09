import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/ProductsAction';
import { detailsUser } from '../actions/UserActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Products from '../components/Products';
import Rating from '../components/Rating';


export default function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={user.seller.logo}
                    alt={user.seller.name}
                    width='100%'
                  ></img>
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <Loading></Loading>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Products key={product._id} product={product}></Products>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}