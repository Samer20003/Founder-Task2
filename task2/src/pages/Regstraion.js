import React, { useState } from 'react';
import "../style/LoginPage.css";
import { useNavigate } from 'react-router-dom';

function Registration() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    // handler to navigate to login if user already has an account
    const haveAnAccountHandler = (e) => {
        e.preventDefault();
        navigate('/LoginPage');
    };


    const validateInformation =  async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const userName = form.querySelector("#userName").value;
            const email = form.querySelector("#email").value;
            const password = form.querySelector("#password").value;

            const newUser = {
                 username: userName,
                 email: email,
                 password: password};

            try {
                const response = await fetch("http://127.0.0.1:8000/signup", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                if (response.ok) {
                    navigate('/LoginPage');
                } else {
                    const errorMessage = await response.json();
                    console.error('Error:', errorMessage);
                }    
            } catch (error){
                console.log('Error:', error);
            }
        }
        setValidated(true);
    };

    return (
        <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center main'>
            <div className='row w-100 justify-content-center '>
                <div className='col-12 col-md-8 col-lg-6  d-flex justify-content-center pt-5 mt-5 '>
                    <div className='login-wrapper  p-3 rounded '>
                        <h1 className='text-center'>Registration</h1>
                        <form
                            noValidate
                            className={validated ? 'was-validated' : ''}
                            onSubmit={validateInformation}
                        >
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">User Name</label>
                                <input
                                    type="text"
                                    className="form-control rounded"
                                    id="userName"
                                    required
                                />
                                <div className="invalid-feedback">Please provide a valid username.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control rounded"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    required
                                />
                                <div className="invalid-feedback">Please provide a valid email.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control rounded"
                                    id="password"
                                    required
                                />
                                <div className="invalid-feedback">Please provide a password.</div>
                            </div>
                            <p>Have an account? 
                                <button className='cursor-pointer bg-transparent border border-0 Account-btn' onClick={haveAnAccountHandler}>Sign in</button>
                            </p>
                            <button type="submit" className="btn ps-5 pe-5 rounded login-btn ">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
