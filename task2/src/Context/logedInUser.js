import React, { createContext, useState, useContext, useEffect } from "react";
const LoggedUserContext = createContext();

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [posts, setPosts] =useState ([]); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [updateBody, setUpdateBody] = useState('');
  const [updateImageUrl, setUpdateImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const userLogedInStorage = JSON.parse(localStorage.getItem('logedInUser'));
    if (userLogedInStorage && userLogedInStorage.isLoggedIn) {
      setLoggedInUser(userLogedInStorage);
    }


    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    if (savedPosts.length > 0) {
      setPosts(savedPosts); 
 
    }
    setLoading(false);

  }, []);


  

  const fetchPosts = async () => {
    if (loggedInUser) {
      try {
        const response = await fetch("http://127.0.0.1:8000/posts/post_list_view", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data); 
        } else {
          console.error("Failed to fetch posts", response.status);
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }
  };

  const addNewPost = (newPost) => {
    const updatedPosts = [...posts, newPost];
    console.log(updatedPosts)
    setPosts(updatedPosts);
    
  };

  const handleDeletePost = async (index) => {
    const post_id = posts[index].id;
    console.log("post_id is ",post_id);
    try{
    const response = await fetch(`http://localhost:8000/posts/delete_post/${post_id}/`, {
      method: "DELETE",
    });
    if (response.status === 204){
    const deletePosts = posts.filter((_, i) => i !== post_id);
    setPosts(deletePosts);
   
      
    console.log("Post deleted successfully");
  } else {
    console.log("Failed to delete post");
  }
} catch (error) {
  console.log("Error deleting post:", error);
}
  };

  const handleUpdatePost = (index) => {
    const updatePosts = posts[index];
    if (updatePosts.userEmail === loggedInUser.email) {
      setEditingIndex(index);
      setUpdateBody(updatePosts.postBody);
      setUpdateImageUrl(updatePosts.postImageUrl);
    }
    console.log("the index is"+ index);
  };

  const saveUpdatedPost = async (index) => {
    const postToUpdate = posts[index];
   
    if (postToUpdate && postToUpdate.user.email === loggedInUser.email) {
      const post_id = postToUpdate.id;
  
      try {
        const response = await fetch(`http://localhost:8000/posts/edit_post/${post_id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: updateBody,
            img_url: updateImageUrl,
          }),
        });
  
        if (response.ok) {
          const updatedPost = await response.json();
          const updatedPosts = [...posts];
          updatedPosts[index].body = updatedPost.body;
          updatedPosts[index].img_url = updatedPost.img_url;
          setPosts(updatedPosts);
          setEditingIndex(null);
         
        } else {
          console.log('Failed to update post');
        }
      } catch (error) {
        console.log('Error updating post:', error);
      }
    } else {
      console.error('Post not found or user not authorized to update');
    }
  };

  const values = {
    setLoggedInUser,
    loggedInUser,
    posts,
    addNewPost,
    handleDeletePost,
    handleUpdatePost,
    setEditingIndex,
    setUpdateBody,
    setUpdateImageUrl,
    editingIndex,
    updateBody,
    updateImageUrl,
    saveUpdatedPost,
    loading,
    fetchPosts
  };

  return (
    <LoggedUserContext.Provider value={values}>
      {children}
    </LoggedUserContext.Provider>
  );
}

export const useLogedInUser = () => {
  return useContext(LoggedUserContext);
};
