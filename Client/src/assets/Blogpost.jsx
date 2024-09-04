import React from 'react';
import { format } from "date-fns"
import { Link } from 'react-router-dom';
import DeletePost from '../pages/DeleteBlog';

const Post = ({ id, content, summary, author, createdAt, title, cover }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  
  return (
    <div className='Post'>
      <div className='image'>
        <Link to={`/post/${id}`}>
          <img src={`${url}/${cover}`} alt={title} />
        </Link>
      </div>
      <div className='text'>
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author}</a>
          <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
}

export default Post;
