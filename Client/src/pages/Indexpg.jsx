import React, { useEffect, useState } from "react";
import Post from "../assets/Blogpost";
export default function Indexpage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post') // Fetch posts from your Express API
      .then(response => response.json())
      .then(posts => {
        console.log(posts);
        setPosts(posts); // Set the posts in the state
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post
          key={post.id} // Add the key prop here
          id={post.id}
          content={post.content}
          summary={post.summary}
          author={post.author}
          createdAt={post.createdAt}
          title={post.title}
          cover={post.cover}
        />
      ))}
    </>
  );
}
