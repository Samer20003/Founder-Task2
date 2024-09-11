import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useLogedInUser} from "../Context/logedInUser"
function NavBar() {

  const navigate = useNavigate();
  const {loggedInUser} = useLogedInUser();
  const handleClose = () =>{
      navigate("/LoginPage");
      const users = JSON.parse(localStorage.getItem('users')|| "[]");
        localStorage.removeItem('users');
        localStorage.removeItem('logedInUser');
      
  }
  return (
<nav className="navbar navbar-expand-lg ">
  <div className="container bg-b">
    <a className="navbar-brand" href="#">Navbar</a>
    <button type="button" onClick={handleClose} className="btn btn-secondary">Logout</button>
  </div>
</nav>
  )
}

export default NavBar