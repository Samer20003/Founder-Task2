import React, { useState } from 'react'
import {useLogedInUser} from '../Context/logedInUser'

function ListPosts() {
  const { 
    loggedInUser,
     posts,
     handleDeletePost,
     handleUpdatePost, 
     setEditingIndex,
     setUpdateBody,
     setUpdateImageUrl,
     editingIndex, 
     updateBody,
     updateImageUrl,
     saveUpdatedPost} 
     = useLogedInUser();

 const handleCancel = () =>{
   setEditingIndex(null);
 }
  return (
    <div className="row d-flex justify-content-center align-items-center pt-5 mt-5">
     
    { posts.map((post, index) => (
      <div key={index} className="col-12 ms-4 d-flex justify-content-center mb-3">
          <div key={index} className="card mb-3" style={{ width: "550px" }}>
            {post.postImageUrl && (
              <img src={post.postImageUrl} className="card-img-top" alt="Post" />
            )}
            <div className="card-body">
              <h5 className="card-title">Post by {post.userEmail}</h5>
              <p className="card-text">{post.postBody}</p>
              <p className="card-text"><small className="text-muted">Posted on {new Date(post.createdDate).toLocaleDateString()}</small>
              </p>
              {loggedInUser && loggedInUser.email === post.userEmail && (
              <div>
                {/* If the post is being edited, show input fields for updating */}
                {editingIndex === index ? (
                  <>
                    <textarea
                      value={updateBody}
                      onChange={(e) => setUpdateBody(e.target.value)}
                      placeholder="Update post content"
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      value={updateImageUrl}
                      onChange={(e) => setUpdateImageUrl(e.target.value)}
                      placeholder="Update image URL"
                      className="form-control mb-2"
                    />
                    <button className="btn btn-success me-2" onClick={() => saveUpdatedPost(index)}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                  <button className="btn btn-primary me-2" onClick={() => handleUpdatePost(index)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeletePost(index)}>
                    Delete
                  </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        </div>
      ))}
   
    </div>
  )
}

export default ListPosts