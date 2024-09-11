import React, {useState} from 'react'
import {useLogedInUser} from '../Context/logedInUser'
import ListPosts from './ListPosts';
import { useNavigate } from 'react-router-dom';
function Post() {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users") || "[]" );
  const [postBody, setPostBody] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const {loggedInUser ,addNewPost} = useLogedInUser();
   // Generating id for the posts

   const initialziedPostID = () =>{
    if(!localStorage.getItem('postId')){
      localStorage.setItem('postId', '0');
    }
  }

  const generateId = () =>{
    let postId = Number(localStorage.getItem('postId')) || 0;
    postId += 1;
    localStorage.setItem('postId', postId);
    return postId;
  }
  
  const handlePostSubmit = (e) =>{
    const currentUser = users.find(user => user.email === loggedInUser?.email)

    if(currentUser){
      const userName = currentUser.userName;
    
    
     e.preventDefault();
     initialziedPostID();
     const postId = generateId();
     const newPost = {
      postId,
      postBody,
      postImageUrl,
      userEmail:loggedInUser?.email,
      userName: userName,
      createdDate: new Date().toISOString()
    };

    navigate('/HomePage')
    
  
    addNewPost(newPost);}

    
    
  }
 
  return (
    
    <div className='row justify-content-center '>
      <div className='col-sm-12 col-md-8 col-lg-6 '>
      <div className="card bg-body-tertiary rounded " style={{ maxWidth: "700px", width:"100%" }} >
        <div className="card-body">
        <div class="form-floating">
          <textarea
           class="form-control"
            placeholder="Leave a comment here" 
            id="floatingTextarea2" 
            style={{height: "100px"}}
            onChange={(e) => {setPostBody(e.target.value)}}>
          </textarea>
          <label for="floatingTextarea2">Write your post</label>
           </div>
         
        <input
            type="text"
            placeholder="Enter image URL..."
            value={postImageUrl}
            onChange={(e) => setPostImageUrl(e.target.value)}
            className="form-control mt-2"
          />
          <button class="btn btn-secondary mt-4 w-100 text-center " onClick={handlePostSubmit}>Submit Post</button>
        </div>
       </div>
      </div>
 
    </div>
  )
}

export default Post