import React from 'react'
import { Breadcrumb, SupportForm } from './sub-component'
import { Setting } from '../profile/sub-component'

const HelpSupportMain = () => {
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
            <SupportForm />
                </div>
          </div>
                </div>
        </section>  
        </main>
    </>
  )
}

export default HelpSupportMain