import React, { useEffect } from 'react'
import { Breadcrumb, ProductSection } from './sub-component'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCId } from '../store/slice/productSlice'
import { useLocation } from 'react-router-dom'

const ProductMain = () => {
  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProductByCId(location.state))
  },[])

  return (

  
    <div>
    <Breadcrumb/>
    <ProductSection/>
    </div>
  )
}

export default ProductMain