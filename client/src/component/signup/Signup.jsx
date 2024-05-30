import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signupUser } from '../store/slice/userSlice';
import { ValidateRegiseter } from '../validate/validate';
import { toast } from 'react-toastify';
const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [userData , setUserData] = useState({
        name:"",
        email:"",
        password:"",
        phone_number:"",
        address:""
    })

   const handleLogin = async()=>{
   const valid =  ValidateRegiseter(userData)
   console.log(valid)
   if(valid.isValid) {
    console.log("dasadsf")
    await dispatch(signupUser(userData)).then((res)=>{
        console.log(res.payload)
        const {statusCode} = res.payload
        if(statusCode===200) {
            navigate("/login")
        }
    }) 
   } else {
    toast.error("Provide data correctly")
   }
    
   }

   const handleChange = (e) => {
    setUserData((prev) => ({...prev , [e.target.name] : e.target.value}))
   }
  return (
    <div className='login-page'>
    <div className='login-bg'>
       
            <div className='login-center'>
        <div className='login-form'>
            <div className='form-flex'>
                <div className='sign-up'>
                  <Link to={'/login'}>  <p>Have an account?  <span>Login</span> </p> </Link>
                </div>
                <div className='welcome-heading'>
                    <h1>Welcome to Fosco</h1>
                </div>
                <div className='form-text'>
                    <p>Lorem ipsum dolor sit amet,
                     consectetur adipiscing elit sed dout labore magna aliqua..</p>
                </div>
                <div className='form-email uppername'>
                <input
                onChange={(e)=>{handleChange(e)}}
                 type='text' name='name' placeholder='enter name' value={userData.name}></input>
                <i className="fa-solid fa-signature"></i>
                </div>
                <div className='form-email'>
                <input type='text' name='email'
                 onChange={(e)=>{handleChange(e)}}
                value={userData.email}
                 placeholder='exmaple.mail.com'>
                </input>
                <i className="fa-regular fa-at"></i>
                </div>
                <div className='form-email upperphone'>
                <input type='text' name='phone_number'
                 onChange={(e)=>{handleChange(e)}}
                 value={userData.phone_number}
                 placeholder='+91'></input>
                <i className="fa-solid fa-phone"></i>
                </div>
                <div className='form-email upperaddress'>
                <input type='text'
                 onChange={(e)=>{handleChange(e)}}
                 value={userData.address}
                  name='address' placeholder='Enter address'></input>
                <i className="fa-solid fa-house"></i>
                </div>
                <div className='form-email form-password'>
                <input type='text'
                 onChange={(e)=>{handleChange(e)}}
                 value={userData.password}
                 name='password'
                 placeholder='6+ strong character'></input>
                <i className="fa-solid fa-lock"></i>
                </div>
                <div className='form-login-button'>
                    <button onClick={handleLogin}>Sign Up</button>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default SignUp











