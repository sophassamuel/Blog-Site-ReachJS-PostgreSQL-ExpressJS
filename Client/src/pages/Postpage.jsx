import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns"
import { Link } from "react-router-dom";
import DeletePost from "./DeleteBlog";
import EditPost from "../assets/Edit";



export default function PostPage() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const url = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        fetch(`${url}/post/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(postInfo => {
                setPostInfo(postInfo);
            });
    }, [id]); 

    if (!postInfo) return ''; 

    return (
        <div className="Main-Div">
        <div className="post-image">
            <img src={`${url}/${postInfo.cover}`} alt={postInfo.title} />
        </div>
        <div className="text">
            <div className="info">
            <h2>{postInfo.title}</h2>
            <h4 className="authorname">{postInfo.author}</h4>
            <h4 className="authorname">{postInfo.category}</h4>
            <time className="time">{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
            </div>
            <div className="main-content">
            <p>{postInfo.content}</p>
            </div>
        </div>
        <div><DeletePost id={id}/></div>
        <div><EditPost id={id}/></div>
        </div>
    );
}
