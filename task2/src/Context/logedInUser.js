import React, { createContext, useState, useContext, useEffect } from "react";
const LoggedUserContext = createContext();

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [posts, setPosts] =useState ([]); 
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
  const values = {
    setLoggedInUser,
    loggedInUser,
    posts,
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
