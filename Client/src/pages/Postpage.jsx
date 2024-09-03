import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns"
import { Link } from "react-router-dom";
import DeletePost from "./DeleteBlog";

export default function PostPage() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
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
            <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} />
        </div>
        <div className="text">
            <div className="info">
            <h2>{postInfo.title}</h2>
            <h4 className="authorname">{postInfo.author}</h4>
            <time className="time">{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
            </div>
            <div className="main-content">
            <p>{postInfo.content}</p>
            </div>
        </div>
        <DeletePost id={id}/>

        </div>
    );
}
