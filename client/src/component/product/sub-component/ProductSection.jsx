import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../../store/slice/productSlice'
import { addCartProduct } from '../../store/slice/cartSlice'
import { Link } from 'react-router-dom'


const ProductSection = () => {
  
  const product = useSelector((store) => store.product.productById.data)
  console.log(product)
  const dispatch = useDispatch()
  const handleWishlist = (id) => {
    console.log(id)
    const body = {
      userId: localStorage.getItem("_id"),
      productId: id,
    };
    dispatch(addToWishlist(body))
  };
  

  const handleCart = (id) => {
    console.log(id)
    const body = {
      product_id:id,
       quantity:1,
        id:localStorage.getItem("_id")
    }
    dispatch(addCartProduct(body))

  }
 

  return (
    <div className='container' >
    <div className='product-section-box-flex'>
    <div className='product-section-box-flex-left'>
      <img src={product&& product.image}></img>
    </div>
    <div className='product-section-box-flex-right'>
    <div>
      <h1>{product&& product.name}</h1>
    </div>
    <div>
      <p>{product&& product.description}</p>
    </div>
    <div>
    <i className="fa-solid fa-indian-rupee-sign"></i> {product&& Math.round(product.price*10)}
    </div>
    <div>
    <i className="fa-solid fa-star"></i> {product&& product.rate}
    </div>
    <div>
    <button 
    onClick={()=>{handleWishlist(product.product_id)}}
     className='add-to-wishlist'>Add to wishlist</button>
    </div>
    <div>
    <Link to={'/cart'}>
    <button 
    onClick={()=>{handleCart(product.product_id)}}
     className='add-to-cart'>Add to cart</button></Link>
    </div>
    </div>
    </div>
    </div>
  )
}

export default ProductSection