import React, { useState } from 'react';
import "../style/LoginPage.css";
import { useNavigate } from 'react-router-dom';
import { useLogedInUser } from '../Context/logedInUser';

function LoginPage() {
    const navigate = useNavigate();
    const [validate, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setLoggedInUser } = useLogedInUser();

    const validateForm = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            validateInformation();
        }
        setValidated(true);
    };

    const haveAnAccountHandler = () => {
        navigate('/Regstraion');
    };

    const validateInformation = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const loggedInUser = {...data.user, isLoggedIn: true};
                setLoggedInUser(loggedInUser);
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser)); 
                navigate('/HomePage');       
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.log('Error:', error);
            alert("There was an error with the login request");
        }
    };

    return (
        <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center main'>
            <div className='row w-100 justify-content-center'>
                <div className='col-12 col-md-8 col-lg-6 d-flex justify-content-center pt-5 mt-5'>
                    <div className='login-wrapper p-3 rounded'>
                        <h1 className='text-center'>Log in</h1>
                        <form
                            noValidate
                            className={validate ? 'was-validated' : ''}
                            onSubmit={validateForm}
                        >
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control rounded"
                                    id="exampleInputEmail1"
                                    required
                                />
                                <div className="invalid-feedback">Please provide a valid email.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control rounded"
                                    id="exampleInputPassword1"
                                    required
                                />
                                <div className="invalid-feedback">Please provide a password.</div>
                            </div>
                            <p>Don't have an account? 
                                <button type="button" className='cursor-pointer bg-transparent border border-0 Account-btn' onClick={haveAnAccountHandler}>Create one!</button>
                            </p>
                            <button type="submit" className="btn ps-5 pe-5 rounded login-btn">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
