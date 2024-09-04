import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function DeletePost({ id }) {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;
    const handleDelete = async () => {
        const url = `${url}/post/${id}`;
        try {
            const response = await axios.delete(url);
            console.log("Response:", response); // Log the entire response for debugging

            if (response.status >= 200 && response.status < 300) { // Check for success status codes
                alert("Post Deleted Successfully");
                console.log("Post Deleted Successfully");
                setRedirect(true);
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("An error occurred while deleting the post");
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate('/');
        }
    }, [redirect, navigate]);

    return (
        <button className="submitpost" onClick={handleDelete}>
            Delete
        </button>
    );
}
