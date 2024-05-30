import React from 'react'
import { heroImage } from '../../../images'

const BannerImage = () => {
  return (
    <div className="main-image">
      <img src={heroImage} alt="image" />
      {/* <a>Included with a prime membership </a> */}
    </div>
  )
}

export default BannerImage