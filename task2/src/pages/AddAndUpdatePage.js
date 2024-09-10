import React  from 'react'
import { useLogedInUser } from '../Context/logedInUser';
function AddAndUpdatePage() {
    const {posts} = useLogedInUser();
 
    posts.forEach(post => {
        console.log('Post ID:', post.postId);
    });
  return (
    <div>
        <h1>niger is </h1>
    </div>
  )
}

export default AddAndUpdatePage