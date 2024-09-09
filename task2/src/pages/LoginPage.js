import React, {useState} from 'react'
import "../style/LoginPage.css"
import { useNavigate } from'react-router-dom';
import {useLogedInUser} from '../Context/logedInUser'
function LoginPage() {
    const navigate = useNavigate();
    const [validate, setValidated] = useState(false);
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setLoggedInUser} = useLogedInUser();
    const validateForm = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } 
          
        setValidated(true);
    }

    const haveAnAccountHandler = () =>{
        navigate('/Regstraion');
    }

    const validateInformation = (e) =>{

        const users = JSON.parse(localStorage.getItem("users") || []);

      const validUser = users.find (user => user.email === email  && user.password === password)
      if(validUser){
        const loogedInUser = {...validUser, isLoggedIn: true};
        localStorage.setItem('logedInUser', JSON.stringify(loogedInUser));
        
        setLoggedInUser(loogedInUser)
        navigate('/HomePage');
      } else {
        alert("Invalid Email or Password")
      }

    }
  return (
    <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center main'>
        <div className='row w-100 justify-content-center'>
            <div className='col-12 col-md-8 col-lg-6  d-flex justify-content-center pt-5 mt-5'>
                <div className='login-wrapper  p-3 rounded '>
                    <h1 className='text-center'>Log in</h1>
                    <form
                    noValidate
                    className={validate ? 'was-validated' : ''}
                    onSubmit={validateForm}
                    >
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control rounded" 
                              id="exampleInputEmail1" 
                              required
                         />
                          <div className="invalid-feedback">Please provide a valid username.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
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
                        <p> Dosent have account? 
                                <button className='cursor-pointer bg-transparent border border-0 Account-btn' onClick={haveAnAccountHandler}>Create one!</button>
                            </p>
                    
                        <button type="submit" onClick={validateInformation} className="btn ps-5 pe-5 rounded login-btn">Login</button>
                        </form>
                        
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;
