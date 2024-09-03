import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default function CreatePost() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // Changed to null for better file handling
  const [video, setVideo] = useState(''); // Ensure this is used correctly based on your needs
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('author', author);
    data.append('title', title);
    data.append('summary', summary);
    data.append('category', category);
    data.append('content', content);

    if (file) {
      data.append('file', file); // Append file as is
    }

    // You might need to handle video if it's not just a string
    data.append('video', video);

    try {
      const response = await fetch('http://localhost:4000/post', { // Updated URL
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input 
        type="text" 
        placeholder="Author" 
        value={author} 
        onChange={ev => setAuthor(ev.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={ev => setTitle(ev.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Summary" 
        value={summary} 
        onChange={ev => setSummary(ev.target.value)} 
      />
      <input 
        type="file" 
        onChange={ev => setFile(ev.target.files[0])} // Correctly handle file selection
      />
      <input 
        type="text" 
        placeholder="Video URL" 
        value={video} 
        onChange={ev => setVideo(ev.target.value)} // Updated to handle text input for video URL
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={category} 
        onChange={ev => setCategory(ev.target.value)} 
      />
      <ReactQuill 
        value={content} 
        modules={modules} 
        formats={formats} 
        onChange={newValue => setContent(newValue)} 
      />
      <button 
        className='submitpost' 
        style={{ marginTop: '5px' }}
      >
        Create Post
      </button>
    </form>
  );
}
