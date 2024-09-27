import React, { useState } from 'react';
import { useLogedInUser } from '../Context/logedInUser';
import { useNavigate } from 'react-router-dom';
import { usePostOperation } from '../Context/postsOperations'
function Post() {
  const navigate = useNavigate();
  const [postBody, setPostBody] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const {loggedInUser} = useLogedInUser();
  const {addNewPost} = usePostOperation();
  
  const handlePostSubmit = async (e) => {    
    try {
      const body = postBody;
      const img_url = postImageUrl;
      const user = loggedInUser.id;
      const pup_date = new Date().toISOString();

      const newPost ={
        body,
        img_url,
        user,
        pup_date,
      }
      const response = await fetch("http://localhost:8000/posts/add_post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok){
        const data = await response.json();
        console.log('New post added successfully', data);
        navigate('/HomePage');
        addNewPost(data);
      } else {
        console.error ('Failed to add')
      }
    }
    catch (error) {
      console.error('Error adding post', error);
    }
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-12 col-md-8 col-lg-6'>
        <div className="card bg-body-tertiary rounded" style={{ maxWidth: "700px", width: "100%" }}>
          <div className="card-body">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                onChange={(e) => { setPostBody(e.target.value); }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Write your post</label>
            </div>
            <input
              type="text"
              placeholder="Enter image URL..."
              value={postImageUrl}
              onChange={(e) => setPostImageUrl(e.target.value)}
              className="form-control mt-2"
            />
            <button
              className="btn btn-secondary mt-4 w-100 text-center"
              onClick={handlePostSubmit}
            >
              Submit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
