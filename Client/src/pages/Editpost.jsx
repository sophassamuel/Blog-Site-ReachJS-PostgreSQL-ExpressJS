import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function EditPage() {
    const { id } = useParams(); // Assuming the ID is passed as a route parameter
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const backend = import.meta.env.VITE_BACKEND_URL;
    ;
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const url = `${backend}/post/${id}`;
                const response = await axios.get(url);
                if (response.status >= 200 && response.status < 300) {
                    setPost(response.data);
                } else {
                    alert("Failed to fetch post data");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
                alert("An error occurred while fetching the post");
            }
        };

        fetchPost();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadFile(file).then((url) => {
                setPost((prevPost) => ({ ...prevPost, cover: url }));
            });
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/post', formData);
        return response.data.url;
    };

    const handleSaveChanges = async () => {
        try {
            const url = `${backend}/post/${id}`;
            await axios.put(url, post); // Update post data on the server
            alert("Post saved successfully");
            navigate(`/post/${id}`); // Redirect back to the post page
        } catch (error) {
            console.error("Error saving post:", error);
            alert("An error occurred while saving the post");
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="modal">
            <h2>Edit Post</h2>
            <div className="image">
                <img src={`${backend}/${post.cover}`} alt="Post Cover" />
            </div>
            <input type="file" onChange={handleFileChange} required/>
            <input type="text" value={post.title} onChange={e => setPost({...post, title: e.target.value})} required/>
            <input type="text" value={post.summary} onChange={e => setPost({...post, summary: e.target.value})} required/>
            <input type="text" value={post.category} onChange={e => setPost({...post, category: e.target.value})} required/>
            <textarea value={post.content} onChange={e => setPost({ ...post, content: e.target.value })} required/>
            <button onClick={handleSaveChanges} className="submitpost">Save Changes</button>
            <button onClick={() => navigate(`/post/${id}`)} className="submitpost">Cancel</button> 
        </div>
    );
}
