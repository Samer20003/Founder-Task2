import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoggedUserContext = createContext();

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [posts, setPosts] =useState (JSON.parse(localStorage.getItem("posts") || "[]")); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [updateBody, setUpdateBody] = useState('');
  const [updateImageUrl, setUpdateImageUrl] = useState('');

 
  useEffect(() => {
    const userLogedInStorage = JSON.parse(localStorage.getItem('logedInUser'));
    if (userLogedInStorage && userLogedInStorage.isLoggedIn) {
      setLoggedInUser(userLogedInStorage);
    }


    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    if (savedPosts.length > 0) {
      setPosts(savedPosts); 
 
    }
  }, []);

  const addNewPost = (newPost) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (index) => {
    const deletePosts = posts.filter((_, i) => i !== index);
    setPosts(deletePosts);
    localStorage.setItem("posts", JSON.stringify(deletePosts));
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

  const saveUpdatedPost = (index) => {
    const updatedPost = [...posts];
    if (updatedPost[index].userEmail === loggedInUser.email) {
      updatedPost[index].postBody = updateBody;
      updatedPost[index].postImageUrl = updateImageUrl;
      localStorage.setItem("posts", JSON.stringify(updatedPost));
      setEditingIndex(null);
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
    saveUpdatedPost
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
