import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'
import { useSelector } from 'react-redux'

const CheckoutSection = () => {
    const user = useSelector((store)=>store.Authentication.UserAuthLogin.data.loggedInUser)
    // console.log(user)
    const location = useLocation()
    // console.log(location)
    const {totalAmount ,Discount,DeliveryCharge} = location.state
  return (
    <div className="container">
    <Breadcrumb />
    <div className="cart-box">
      <div className="cart-box-left">
      <div className='login-bar'>
      <div>
        <h1 className='login-h1'>Login <i className="fa-solid fa-check"></i></h1>
      </div>
      <div className='inner-flex'>
      <h1>{user.name}</h1>
      <h1>{user.phone_number}</h1>
      </div>
      </div>
      <div className='login-bar'>
      <div>
        <h1 className='login-h1'>Address <i className="fa-solid fa-location-dot"></i></h1>
      </div>
      <div className='inner-flex'>
      <h1>{user.address}</h1>
      </div>
      </div>
      <div className="place-order-bar margin-40">
     <Link to='/wallet' state={{totalAmount:totalAmount-Discount-DeliveryCharge}} >
      <button>Continue</button>
      </Link> 
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
    </div>
  </div>
  )
}

export default CheckoutSection