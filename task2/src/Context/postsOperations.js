import React, { createContext, useContext, useState } from "react";
import { useLogedInUser } from "../Context/logedInUser"

const PostOperationsContext = createContext();

export function PostOperationProvider({ children }) {
  const { loggedInUser, posts, setPosts } = useLogedInUser(); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [updateBody, setUpdateBody] = useState('');
  const [updateImageUrl, setUpdateImageUrl] = useState('');


  // Add new post
  const addNewPost = (newPost) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
  };

  // Delete post
  const handleDeletePost = async (id) => {
    const post = posts.find(p => p.id === id);
    if (!post) return console.error("Post not found");

    try {
      const response = await fetch(`http://localhost:8000/posts/delete_post/${post.id}/`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        const updatedPosts = posts.filter(p => p.id !== post.id);
        setPosts(updatedPosts);
        console.log("Post deleted successfully");
      } else {
        console.log("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Update post
  const saveUpdatedPost = async (id) => {
    const postToUpdate = posts.find(p => p.id === id);
    if (!postToUpdate) return console.error("Post not found");

    if (postToUpdate.user.email === loggedInUser.email) {
      try {
        const response = await fetch(`http://localhost:8000/posts/edit_post/${postToUpdate.id}/`, {
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
          const updatedPosts = posts.map(p =>
            p.id === postToUpdate.id ? updatedPost : p
          );
          setPosts(updatedPosts);
        } else {
          console.error('Failed to update post');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    } else {
      console.error('User not authorized to update this post');
    }
  };

  const values = {
    addNewPost,
    handleDeletePost,
    setEditingIndex,
    setUpdateBody,
    setUpdateImageUrl,
    editingIndex,
    updateBody,
    updateImageUrl,
    saveUpdatedPost,
  };

  return (
    <PostOperationsContext.Provider value={values}>
      {children}
    </PostOperationsContext.Provider>
  );
}

export const usePostOperation = () => useContext(PostOperationsContext);
