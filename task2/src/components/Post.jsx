import React, {useState} from 'react'
import {useLogedInUser} from '../Context/logedInUser'
import ListPosts from './ListPosts';
function Post() {
  const users = JSON.parse(localStorage.getItem("users") || "[]" );
  const [postBody, setPostBody] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const {loggedInUser ,addNewPost} = useLogedInUser();
  const handlePostSubmit = (e) =>{
     e.preventDefault();
     const newPost = {
      postBody,
      postImageUrl,
      userEmail:loggedInUser.email,
      createdDate: new Date().toISOString()
    };
    addNewPost(newPost);
     setPostBody(''); 
     setPostImageUrl('');
    
  }
  
  return (
    <div className='container-fluid'>
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
          <textarea 
            className="card-text" 
            placeholder="Write your post..."
            onChange={(e) => {setPostBody(e.target.value)}}
          ></textarea>
        <input
            type="text"
            placeholder="Enter image URL..."
            value={postImageUrl}
            onChange={(e) => setPostImageUrl(e.target.value)}
            className="form-control mt-2"
          />
          <button onClick={handlePostSubmit}>Submit Post</button>
        </div>
        
</div>
    </div>
  )
}

export default Post