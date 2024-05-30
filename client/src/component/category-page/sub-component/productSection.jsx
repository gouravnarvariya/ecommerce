import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  getAllProduct,
  getAllWishlistProduct,
  getProductByCategory,
} from "../../store/slice/productSlice";
import { Link, useLocation } from "react-router-dom";

const CardSection = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const {category_id} = location.state
  console.log(category_id)
 
  const productList = useSelector((store) => store.product.productByCategoryList);
  const wishlistItems = useSelector((store) => store.product.wishlistProductList);

  useEffect(() => {
    dispatch(getProductByCategory(category_id))
    dispatch(getAllWishlistProduct());
  }, [dispatch]);

  const handleWishlist = (id) => {
    const body = {
      userId: localStorage.getItem("_id"),
      productId: id,
    };

    dispatch(addToWishlist(body)).then(() => {
      dispatch(getAllWishlistProduct());
    });
  };

  const isWishlisted = (productId) => {
    return wishlistItems.data?.some(item => item.Product.product_id === productId);
  };

  if (productList.pending || wishlistItems.pending) {
    return <div>Loading...</div>;
  }

  if (productList.error || wishlistItems.error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="container product-section">
      {productList.data &&
        productList.data.map((product) => (
          <div key={product.product_id} className="product-box">
            <div>
              <label onClick={() => handleWishlist(product.product_id)}>
                <i className={`fa-heart heart ${isWishlisted(product.product_id) ? 'fa-solid' : 'fa-regular'}`}></i>
              </label>
            </div>
            <Link to='/product' state={product.product_id}>
            <img src={product.image} alt="box" />
            <h1>{product.name}</h1>
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {Math.round(product.price * 10)}
            </span>
            </Link>
            <button>add to cart</button>
          </div>
        ))}
    </div>
  );
};

export default CardSection;
