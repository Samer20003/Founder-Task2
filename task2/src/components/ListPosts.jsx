import React, { useState } from 'react';
import { useLogedInUser } from '../Context/logedInUser';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
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
    saveUpdatedPost
  } = useLogedInUser();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickForTheIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div className="row d-flex justify-content-center align-items-center pt-5 mt-5">
      {posts.map((post, index) => (
        <div key={index} className="col-12 ms-4 d-flex justify-content-center mb-3">
          <div className="card mb-3" style={{ width: "550px" }}>
            {post.postImageUrl && (
              <img src={post.postImageUrl} className="card-img-top" alt="Post" />
            )}
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Post by {post.userEmail}</h5>
             
                {loggedInUser && loggedInUser.email === post.userEmail && (
                  <>
                    <IconButton
                      size="large"
                      aria-label="display more actions"
                      edge="end"
                      onClick={handleClickForTheIcon}
                    >
                      <MoreIcon />
                    </IconButton>

                
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={() => {
                        navigate(`/updateAndAddPost/${post.postId}`)
                        handleUpdatePost(index);
                        handleClose();
                      }}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => {
                        handleDeletePost(index);
                        handleClose();
                      }} style={{ color: 'red' }}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </div>
              
              <p className="card-text">{post.postBody}</p>
              <p className="card-text">
                <small className="text-muted">
                  Posted on {new Date(post.createdDate).toLocaleDateString()}
                </small>
              </p>

        
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListPosts;
