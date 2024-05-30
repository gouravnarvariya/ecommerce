import React from 'react'
import { Breadcrumb, ChangePasswordForm} from './sub-component'
import { Setting } from '../profile/sub-component'

const ChangePasswordMain = () => {
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
            <ChangePasswordForm />
                </div>
          </div>
                </div>
        </section>  
        </main>
    </>
  )
}

export default ChangePasswordMain