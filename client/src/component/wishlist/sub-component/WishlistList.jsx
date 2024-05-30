import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  getAllWishlistProduct,
} from "../../store/slice/productSlice";
import Breadcrumb from "./Breadcrumb";

const WishlistList = () => {
  const dispatch = useDispatch();
  const [noResult , setNoResult] = useState(false)
  
  const getWishlistProduct = useSelector(
    (store) => store.product.wishlistProductList
  );
  console.log(getWishlistProduct.data);

  useEffect(() => {
    dispatch(getAllWishlistProduct()).then((response) => {
      if (response.payload && response.payload.length > 0) {
        console.log("secod")
        setNoResult(false);
      } else {
        console.log("first")
        setNoResult(true);
      }
    });
  }, []);

  const handleWishlist = (id) => {
    const body = {
      userId: localStorage.getItem("_id"),
      productId: id,
    };

    dispatch(addToWishlist(body)).then(() => {
      dispatch(getAllWishlistProduct()).then((response) => {
        if (response.payload && response.payload.length > 0) {
          console.log("secod")
          setNoResult(false);
        } else {
          console.log("first")
          setNoResult(true);
        }
      });
    });
  };

  return (
    <div className="container">
      <Breadcrumb />
      {noResult ?
      <div className="abcd">
       <div className="order-now">
      <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png">
      </img>
      </div>
     
      <p>Empty Wishlist 
 You have no items in your wishlist. Start adding! </p>
       </div> :
      <div>
        <ul className="wishlist-list">
          {getWishlistProduct.data &&
            getWishlistProduct.data.map((product) => {
              {/* console.log(product.Product); */}
              return (
                <li key={product.Product.product_id}>
                  <div className="wishlist-list-box">
                    <img src={product.Product.image} alt="box" />
                    <div>
                      <h1>{product.Product.name}</h1>
                      <span>
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        {Math.round(product.Product.price * 10)}
                      </span>
                    </div>
                    <span>
                      <i onClick={()=>{handleWishlist(product.Product.product_id)}} className="fa-solid fa-trash"></i>
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>}
    </div>
  );
};

export default WishlistList;
