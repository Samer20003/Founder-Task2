import React from 'react'
import { useNavigate } from 'react-router-dom'
function NavBar() {

  const navigate = useNavigate();

  const handleClose = () =>{
      navigate("/LoginPage");
      const users = JSON.parse(localStorage.getItem('users')|| "[]");
      const email = users.find(user => user.email);
      if(email){
        localStorage.removeItem('users');
      }
  }
  return (
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Navbar</a>
    <button type="button" onClick={handleClose} class="btn btn-secondary">Logout</button>
  </div>
</nav>
  )
}

export default NavBar