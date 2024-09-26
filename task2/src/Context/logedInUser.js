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
      fetchPosts();
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

  const handleDeletePost = async (id) => {
    const post= posts.find(p => p.id ==id);
    console.log("post_id is ",post.id);
    try{
    const response = await fetch(`http://localhost:8000/posts/delete_post/${post.id}/`, {
      method: "DELETE",
    });
    if (response.status === 204){
    const deletePosts = posts.filter((_, i) => i !== post.id);
    setPosts(deletePosts);
   
      
    console.log("Post deleted successfully");
  } else {
    console.log("Failed to delete post");
  }
} catch (error) {
  console.log("Error deleting post:", error);
}
  };
  const saveUpdatedPost = async (id) => {
    const postToUpdate = posts.find(p => p.id == id);
   
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
          const updatedPost = await response.json().post;  
          console.log("update iss ",updatedPost );
          postToUpdate.body = updatedPost.body;
          postToUpdate.img_url = updatedPost.img_url;
        const orignalPosts = posts.filter((post) => {
            if(post.id == postToUpdate.id){
              return false ;
            }
            return true ;
          })
          orignalPosts.push(updatedPost);
          console.log(orignalPosts);
          setPosts(orignalPosts);
         
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
