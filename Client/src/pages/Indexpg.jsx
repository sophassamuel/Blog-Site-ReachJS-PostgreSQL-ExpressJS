import React, { useEffect, useState } from "react";
import Post from "../assets/Blogpost";

export default function Indexpage() {
  const [posts, setPosts] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!url) {
      console.error("REACT_APP_BACKEND_URL is not defined");
      return;
    }

    fetch(`${url}/post`)
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [url]);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post.id}
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
