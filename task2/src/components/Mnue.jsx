import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert'; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLogedInUser } from '../Context/logedInUser';
import { useNavigate } from 'react-router-dom';
import { usePostOperation } from '../Context/postsOperations';
function Mnue({postId}) {

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClickForTheIcon = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const navigate = useNavigate();
    const { handleDeletePost } = usePostOperation();
    
    return (
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
            navigate(`/updateAndAddPost/${postId}`);
            handleClose();
          }}>
            Edit
          </MenuItem>
          <MenuItem 
            onClick={() => {
              handleDeletePost(postId);
              handleClose();
            }} 
            style={{ color: 'red' }}
          >
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  }

export default Mnue