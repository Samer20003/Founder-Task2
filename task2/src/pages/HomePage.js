import React from 'react'
import NavBar from '../components/NavBar'
import {useLogedInUser} from '../Context/logedInUser'
import Post from "../components/Post"
import ListPosts from '../components/ListPosts'
function HomePage() {
  return (
    <di className ="container-fluid">
      <div className='row'>
        <div className = "col-12">
      <NavBar/>
      </div>
      <div className = "col-12 d-flex justify-content-center">
      <Post/>
      </div>
      <ListPosts/>
      </div>
    </di>
  )
}

export default HomePage