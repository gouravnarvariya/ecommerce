import React from 'react'

const SupportForm = () => {
  return (
    <>
   <div className="card suport-card">
   <div className="thhdng-chng">
          <h3>Help & Support</h3>
        </div>
        <div className='suport-form'>
        <div className="form-inputs">
            <span>Name</span>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <div className="form-inputs">
            <span>Email</span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email address"
            />
          </div>
          <div className="form-inputs">
            <span>Conatct No.</span>
            <input
              type="number"
              name="phone"
              className="form-control"
              placeholder="Enter contact no."
            />
          </div>
          <div className="form-inputs">
            <span>Message</span>
            <textarea name="" placeholder="Message..." id="" cols="0" rows="4"></textarea>
          </div>
          <div className="suport-btn">
            <button className="btn primary-btn">Send</button>
          </div>
        </div>
   </div>


    </>
  )
}

export default SupportForm