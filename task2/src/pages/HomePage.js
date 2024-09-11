import React from 'react'
import NavBar from '../components/NavBar'
import ListPosts from '../components/ListPosts'
import { useNavigate } from 'react-router-dom'
function HomePage() {
  const navigate = useNavigate();
  return (
    <div className ="container-fluid bg-dark-subtle">
      <div className='row'>
        <div className = "col-12">
      <NavBar/>
      </div>
      <div className='col-12 d-flex justify-content-center '>
      <button type="button" class="btn btn-secondary w-50 mt-5 " onClick={()=>{
          navigate('/updateAndAddPost/new');
         
      }}>add Post</button>

      </div>
      <ListPosts/>
      </div>
    </div>
  )
}

export default HomePage