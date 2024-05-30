import React from 'react'
import { bannerr } from '../../../images'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BannerSection = () => {
  return (
    <section className="banner-sect" >
    <div className="banner-main">
        <div className="banner-image">
            <img src={bannerr} alt="banner"></img>
        </div>
        <div className="banner-data">
            <div className="banner-heading">
                <h1>This is Fosco</h1>
            </div>
            <div className="banner-p">
                <p>Our fabric will build your trust in us</p>
            </div>
            <div className="banner-button-main">
                <div className="banner-button">
                    <button><Link to={"/login"}>Show Now  <i className="fa-solid fa-arrow-right"></i></Link></button>
                </div>
                
            </div>
        </div>

    </div>
  </section>
    
  
  )
}

export default BannerSection