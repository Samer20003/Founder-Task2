import React from 'react'
import "../style/LoginPage.css"
function LoginPage() {
  return (
    <div className='container-fluid 100-w vh-100'>
        <div className='row'>
            <div className='col-12 d-flex justify-content-center pt-5 mt-5'>
                <div className='login-wrapper w-25 p-3 rounded '>
                    <h1 className='text-center'>Log in</h1>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control rounded " id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control rounded" id="exampleInputPassword1"/>
                        </div>
                    
                        <button type="submit" className="btn ps-5 pe-5 rounded">Login</button>
                        </form>
                        
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;
