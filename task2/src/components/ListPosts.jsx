import React, { useEffect, useState } from 'react';
import { useLogedInUser } from '../Context/logedInUser';
import PostShow from './PostShow';


function ListPosts() {
  const { posts, fetchPosts } = useLogedInUser();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="row d-flex justify-content-center align-items-center pt-5 mt-5">
      {posts.map((post) => (
        <div  className="col-12 ms-4 d-flex justify-content-center mb-3">
    
        <PostShow post={post.body} userName={post.user.username} postImg = {post.img_url} postDate = {post.pup_date} postEmail = {post.user.email} postId = {post.id} />
     
        </div>
      ))}
    </div>
  );
}

export default ListPosts;
