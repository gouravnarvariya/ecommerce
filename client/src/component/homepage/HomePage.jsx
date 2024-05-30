import React, { useEffect } from 'react'
import { BannerImage, CardSection, ProductSection } from './sub-component'
import Api from '../Api/Api'

const Homepage = () => {


  return (
    <div className='homepage'>
    <BannerImage/>
    <CardSection/>
    <ProductSection/>
    </div>
  )
}

export default Homepage