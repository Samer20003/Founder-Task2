import React, { createContext , useState, useContext , useEffect } from "react";

const LoggedUserContext = createContext();


export function LoggedInUserProvider ({children}){
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [posts, setPosts] = useState (JSON.parse(localStorage.getItem("posts") || "[]"));
    const [editingIndex, setEditingIndex] = useState(null);
    const [updateBody, setUpdateBody] = useState('');
    const [updateImageUrl, setUpdateImageUrl] = useState('');

    useEffect (() => {
        const userLogedInStorge = JSON.parse(localStorage.getItem('logedInUser'));
        if(userLogedInStorge && userLogedInStorge.isLoggedIn){
            setLoggedInUser(userLogedInStorge);
        }
       console.log(posts)
    }, []);

    const addNewPost = (newPost) => {
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }

    const handleDeletePost = (index) =>{
        const deletePosts = posts.filter((_, i) => i!== index)
        setPosts(deletePosts);
        localStorage.setItem("posts", JSON.stringify(deletePosts));
    
      }


  const handleUpdatePost = (index) =>{
    const updatePosts = posts[index];
   if(updatePosts.userEmail === loggedInUser.email){
    setEditingIndex(index);
    setUpdateBody(updatePosts.postBody);
    setUpdateImageUrl(updatePosts.postImageUrl);
   } 
  }

  const saveUpdatedPost = (index) =>{
    const updatedPost = [...posts];
    if(updatedPost[index].userEmail === loggedInUser.email){

      updatedPost[index].postBody = updateBody;
      updatedPost[index].postImageUrl = updateImageUrl;

      localStorage.setItem("posts", JSON.stringify(updatedPost));
      setEditingIndex(null);
    }
  }
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
