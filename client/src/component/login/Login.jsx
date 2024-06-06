import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ValidateLogin } from '../validate/validate';
// import { addAccessToken } from '../Api/Api';
import { toast } from "react-toastify";
import {  handleLogin } from '../store/slice/authSlice';
import { addAccessToken } from '../Api/Api';
import { setAccessToken, setRefreshToken, setUserId } from '../Tokenhandler/TokenHandler';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState();

    const userData = useSelector((store) => store.Authentication.UserAuthLogin);

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        const errorMessage = ValidateLogin(data);
        setError(errorMessage);
        if (errorMessage.isValid) {
            dispatch(handleLogin(data));
        } else {
            toast.error(errorMessage.message);
        }
    };

    useEffect(() => {
        console.log(userData)
        if (userData?.data) {
            setAccessToken(userData?.data?.accessToken)
            setRefreshToken(userData?.data?.refreshToken)
            setUserId(userData?.data?.loggedInUser?.id)
            // localStorage.setItem("user", "loggedIn");
            addAccessToken(userData?.data?.token);
            navigate('/home');
        }
    }, [userData.data]);

    useEffect(() => {
        if (userData?.error) {
            toast.error(userData.error.message);
            
        }
    }, [userData.error]);

    return (
        <div className='login-page'>
            <div className='login-bg'>
                <div className='login-center'>
                    <div className='login-form'>
                        <div className='form-flex'>
                            <div className='sign-up'>
                                <Link to={'/signup'}> <p>Don't have an account? <span>Sign Up</span>  </p></Link>
                            </div>
                            <div className='welcome-heading'>
                                <h1>Welcome to Fosco</h1>
                            </div>
                            <div className='form-text'>
                                <p>Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit sed dout labore magna aliqua..</p>
                            </div>
                            <div className='form-email'>
                                <input type='text' name='email' value={data.email} onChange={handleChange} placeholder='example.mail.com'></input>
                                <i className="fa-regular fa-at"></i>
                            </div>
                            <div className='form-email form-password'>
                                <input type='text' name='password' value={data.password} onChange={handleChange} placeholder='6+ strong character'></input>
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <div className='form-login-button'>
                           
                                <button onClick={handleSubmit}> {userData?.pending ? <div className="loader"></div> : 'Login'}</button>
                            </div>
                            <div className='form-forget'>
                                <p>Forget Password?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
