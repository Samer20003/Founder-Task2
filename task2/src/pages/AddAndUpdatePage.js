import React, { useEffect } from 'react';
import { useLogedInUser } from '../Context/logedInUser';
import { useParams, useNavigate } from 'react-router-dom';
import Post from '../components/Post';

function AddAndUpdatePage() {
   const navigate = useNavigate();
   const { 
    posts,
    setUpdateBody,
    setUpdateImageUrl,
    updateBody,
    updateImageUrl,
    saveUpdatedPost,
    setEditingIndex
   } = useLogedInUser();

   const { id } = useParams();
   const postIndex = posts.findIndex((p) => p.postId === parseInt(id, 10)); // i use the findIndex insted of find because my functiones dpeneds on the index not the id

   useEffect(() => {
      if (id && postIndex >= 0) {
         const post = posts[postIndex];
         setUpdateBody(post.postBody);
         setUpdateImageUrl(post.postImageUrl);
         setEditingIndex(postIndex); 
      }
   }, [id, postIndex, posts, setUpdateBody, setUpdateImageUrl, setEditingIndex]);

   const handleUpdate = (e) => {
      e.preventDefault();
      saveUpdatedPost(postIndex);  // send the index of the post 
      navigate('/HomePage');
   };

   return (
      <div className='container-fluid pt-5 mt-5'>
         <div className='row justify-content-center'>
            <div className="col-12 col-md-10 col-lg-8">
              
               <Post />
            </div>   
         </div>

         <div className='row justify-content-center mt-5 pt-5'>
            <div className='col-12 col-md-10 col-lg-8'>
               <h2 className='text-center'>Update Post</h2>
               <form onSubmit={handleUpdate}>
                  <div className="form-group">
                     <label htmlFor="postBody">Post Body:</label>
                     <textarea 
                        className="form-control" 
                        id="postBody" 
                        rows="3"
                        value={updateBody}
                        onChange={(e) => setUpdateBody(e.target.value)}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="postImageUrl">Post Image URL:</label>
                     <input 
                        type="text" 
                        className="form-control" 
                        id="postImageUrl"
                        value={updateImageUrl}
                        onChange={(e) => setUpdateImageUrl(e.target.value)}
                     />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default AddAndUpdatePage;
