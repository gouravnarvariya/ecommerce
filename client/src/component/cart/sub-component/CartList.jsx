import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "./Breadcrumb";
import { addCartProduct, getCartProduct } from "../../store/slice/cartSlice";
import { Link } from "react-router-dom";

const CartList = () => {
  const dispatch = useDispatch();
  const [noResult , setNoResult] = useState(false)
  const getCartList = useSelector((store) => store.cart.cartList);

 
  useEffect(() => {
    dispatch(getCartProduct()) .then((response) => {
          if (response.payload && response.payload.length > 0) {
            // console.log("secod")
            setNoResult(false);
          } else {
            // console.log("first")
            setNoResult(true);
          }
        });
  }, []);

  const handleIncreaseItem = (props) => {
    const { product_id, quantity } = props;
    const newQuantity = quantity + 1;
    const body = {
      product_id: product_id,
      quantity: newQuantity,
      id: localStorage.getItem("_id"),
    };
    dispatch(addCartProduct(body)).then(() => {
      dispatch(getCartProduct())
    });
  };

  const handleDecreaseItem = (props) => {
    const { product_id, quantity } = props;
    const newQuantity = quantity - 1;
    const body = {
      product_id: product_id,
      quantity: newQuantity,
      id: localStorage.getItem("_id"),
    };
    dispatch(addCartProduct(body)).then(() => {
      dispatch(getCartProduct()).then((response) => {
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

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    getCartList.data&& getCartList.data.forEach((product) => {
      totalAmount += Math.round(
        product.Product.price * 10) * product.quantity;
    });
    return totalAmount;
  };

  const totalAmount = calculateTotalAmount();
  const Discount = Math.round(totalAmount/18);
  const DeliveryCharge = 120;

  return (
    <div className="container">
      <Breadcrumb />
      {noResult ?
       <div className="order-now">
      <img src="https://img.freepik.com/free-vector/order-now-banner_23-2148709875.jpg?t=st=1717066032~exp=1717069632~hmac=afb4dbdb920af0bd47fd77f865f100a64905512ba0c8bbfeb3f3c68d031a17c3&w=1800">
      </img>
      </div> :
      <div className="cart-box">
        <div className="cart-box-left">
        <div>
        <ul className="wishlist-list">
            {getCartList.data &&
              getCartList.data.map((product) => {
                {
                  /* console.log(product.Product); */
                }
                return (
                  <li key={product.Product.product_id}>
                    <div className="wishlist-list-box">
                      <img src={product.Product.image} alt="box" />
                      <div>
                        <h1>{product.Product.name}</h1>
                        <span>
                          <i className="fa-solid fa-indian-rupee-sign"></i>
                          {Math.round(
                            product.Product.price * 10 * product.quantity
                          )}
                        </span>
                      </div>
                      <span className="quantity-span">
                        <i
                          onClick={() => {
                            handleIncreaseItem({
                              product_id: product.Product.product_id,
                              quantity: product.quantity,
                            });
                          }}
                          className="fa-solid fa-plus"
                        ></i>
                        {product.quantity}
                        <i
                          onClick={() => {
                            handleDecreaseItem({
                              product_id: product.Product.product_id,
                              quantity: product.quantity,
                            });
                          }}
                          className="fa-solid fa-minus"
                        ></i>
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
         <div className="place-order-bar">
            <Link to='/checkout' state={{ 
               totalAmount:totalAmount,
               Discount:Discount,
               DeliveryCharge:DeliveryCharge
             }} >  <button>Plcae Order</button> </Link>
         </div>
        </div>
        <div className="cart-box-right">
          <div className="price-detail-border">
            <h1>Price Details</h1>
          </div>
          <div className="price-box">
            <div className="price-list-flex">
              <h3>Price ( items )</h3>
              <h3>{totalAmount}</h3>
            </div>
            <div className="price-list-flex">
              <h3>Discount</h3>
              <h3 className="text-color-green">-{Discount}</h3>
            </div>
            <div className="price-list-flex">
              <h3>Delivery Charges</h3>
              <h3 className="text-color-green"> <span>{DeliveryCharge}</span> Free</h3>
            </div>
          </div>
          <div className="price-list-flex price-amount-border">
            <h1>Total Amount</h1>
            <h1>{totalAmount-Discount-DeliveryCharge}</h1>
          </div>
          <div>
            <h1 className="text-color-green">You will save {Discount+DeliveryCharge} on this order</h1>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default CartList;
