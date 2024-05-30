import React from 'react'
import { Breadcrumb, PrivacyPolicyData } from './sub-component'
import { Setting } from '../profile/sub-component'

const PrivacyPolicyMain = () => {
  return (
    <>
     <main>
      <Breadcrumb />
        <section className="seting-section">
            <div className='container'>
            <div className="home-flex-main">
            <div className="home-flex-30">
            <Setting />
            </div>
            <div className="home-flex-70">
            <PrivacyPolicyData />
                </div>
          </div>
            </div>
        </section>  
        </main>
    </>
  )
}

export default PrivacyPolicyMain