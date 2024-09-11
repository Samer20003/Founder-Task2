import React from 'react'
import { Navigate } from 'react-router-dom'
import { useLogedInUser } from '../Context/logedInUser'
function Protected({children}) {
    const { loggedInUser, loading } = useLogedInUser();

 if(loading){
    return <div>fuck your bitch ass niga </div>
 }
    if(loggedInUser && loggedInUser.isLoggedIn){
        return children;
    }
  return (
   
   <Navigate to ="/LoginPage/" />
  )
 
}

export default Protected