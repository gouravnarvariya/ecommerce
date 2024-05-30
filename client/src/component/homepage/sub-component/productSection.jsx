import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  getAllProduct,
  getAllWishlistProduct,
} from "../../store/slice/productSlice";
import { addCartProduct } from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";

const CardSection = () => {
  const dispatch = useDispatch();
  const productList = useSelector((store) => store.product.productList);
  const wishlistItems = useSelector((store) => store.product.wishlistProductList);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllWishlistProduct());
    
  }, [dispatch]);

  const handleWishlist = async (id) => {
    try {
      const body = {
        userId: localStorage.getItem("_id"),
        productId: id,
      };
  
      await dispatch(addToWishlist(body));
      await dispatch(getAllWishlistProduct());
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      // Handle the error appropriately, maybe show a notification to the user
    }
  };
  

  const handleCart = (id) => {
    
    const body = {
      product_id:id,
       quantity:1,
        id:localStorage.getItem("_id")
    }
    dispatch(addCartProduct(body))

  }

  const isWishlisted = (productId) => {
    return wishlistItems.data?.some(item => item.Product.product_id === productId);
  };

  // if (productList.pending || wishlistItems.pending) {
  //   return <div>Loading...</div>;
  // }

  // if (productList.error || wishlistItems.error) {
  //   return <div>Error loading data</div>;
  // }

  return (
    <div className="product-section">
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
            <button onClick={()=>{
              handleCart(product.product_id)
            }}>add to cart</button>
          </div>
        ))}
    </div>
  );
};

export default CardSection;
