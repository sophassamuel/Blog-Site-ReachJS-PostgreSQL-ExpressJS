import { useState } from "react";
import { Navigate } from "react-router-dom";


export default function DeletePost({id}){
    const [redirect, setRedirect] = useState(false);

    const handleDelete= async()=>
    {
        const response = await fetch(`http://localhost:4000/post/${id}`,{
            method: 'DELETE',
        
        });
        if (response.ok){
            console.log("Post Deleted Successfully")
            setRedirect(true) 
        }
    }
    if (redirect) {
        return <Navigate to="/" />;
      }
        return(
            <button className="submitpost" onClick={handleDelete}>
            Delete
            </button>
        )
        
}