import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {useLogedInUser} from "../Context/logedInUser"
import '../style/NavBar.css'

function NavBar() {
  
  const navigate = useNavigate();
  const location = useLocation(); // to get the cuurent path 
  const {loggedInUser} = useLogedInUser();
  const handleClose = () =>{
      navigate("/LoginPage");
      const users = JSON.parse(localStorage.getItem('users')|| "[]");
        localStorage.removeItem('users');
        localStorage.removeItem('logedInUser');
      
  }

  const handleHomeClick = () =>{
    if (location.pathname === '/HomePage'){
      window.location.reload();
    } else {
      navigate("/HomePage");
    }
  } 
  return (
<nav className="navbar navbar-expand-lg bg-light ">
  <div className="container">
    <a className="navbar-brand" href="#">Navbar</a>
    <div className='navbar-items'>
    <button type="button" onClick={handleHomeClick} className="btn btn-secondary bg-transparent text-black me-3 home-btn">Home</button>
    <button type="button" className="btn btn-secondary bg-transparent text-black me-3 profile-btn">Profile</button>
    <button type="button" onClick={handleClose} className="btn btn-secondary bg-transparent text-black logout-btn">Logout</button>
    </div>
  </div>
</nav>
  )
}

export default NavBar