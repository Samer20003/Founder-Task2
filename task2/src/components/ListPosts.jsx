import React, { useEffect, useState } from 'react';
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
    setPosts
  } = useLogedInUser();
  
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickForTheIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showPosts = async () =>{
    try{
      const response = await fetch("http://127.0.0.1:8000/posts/post_list_view", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedInUser?.token}`,
        },
      });
      if(response.ok){
        const data = await response.json();
        localStorage.setItem("posts", JSON.stringify(data)); 
        setPosts(data);
       
       
      } else {
        console.error("Failed to fetch posts", response.status);
      }
    } catch (error){
      console.error("Error fetching posts", error);
    }
  }
  console.log("the posts is ", posts);
 useEffect(()=>{

  showPosts();
 },[])
  return (
    <div className="row d-flex justify-content-center align-items-center pt-5 mt-5">
      {posts.map((post, index) => (
        <div key={index} className="col-12 ms-4 d-flex justify-content-center mb-3">
          <div className="card mb-3" style={{ width: "550px" }}>
            {post.img_url && (
              <img src={post.img_url} className="card-img-top" alt="Post" />
            )}
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="card-title"> {post.user.username}</h6>
             
                {loggedInUser && loggedInUser.email === post.user.email && (
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
              <p className="card-text pb=2">
                <small className="text-muted  ">
                  Posted on {new Date(post.pup_date).toLocaleDateString()}
                </small>
              </p>
              <p className="card-text">{post.body}</p>
            

        
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListPosts;
