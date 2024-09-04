import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

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
  const navigate = useNavigate();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const [fileError, setFileError] = useState('');

  const createNewPost = async (ev) => {
    ev.preventDefault();

    // Reset errors
    setFieldError('');
    setFileError('');

    // Check if all required fields are filled
    if (!author || !title || !summary || !category || !content || !file) {
      setFieldError('All fields are required');
      return;
    }

    // Check if the content is not empty or just whitespace
    const plainTextContent = content.trim();
    if (plainTextContent === '' || plainTextContent === '<p><br></p>') {
      setFieldError('Content cannot be empty');
      return;
    }

    // Validate file type
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const fileType = file.type.split('/')[1];
    if (!allowedFileTypes.test(fileType)) {
      setFileError('Invalid file type. Only images are allowed (jpeg, jpg, png, gif)');
      return;
    }

    const postData = {
      author,
      title,
      summary,
      category,
      content,
    };

    const formData = new FormData();
    formData.append('postData', JSON.stringify(postData));
    formData.append('file', file);

    // Hardcoded backend URL
    const backendUrl = "http://localhost:4000/post";

    try {
      const response = await axios.post(backendUrl, formData, {
      });
      if (response.data.postDocument) {
        alert("Post Created Successfully");
        setRedirect(true);
      } else {
        setFieldError(response.data.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setFieldError('Failed to create post');
    }
  };

  if (redirect) {
    navigate('/');
    return null; // Prevent further rendering
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={ev => setAuthor(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        required
      />
      <input
        type="file"
        onChange={ev => setFile(ev.target.files[0])}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={ev => setCategory(ev.target.value)}
        required
      />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={newValue => {
          setContent(newValue);
          setFieldError('');
          setFileError('');
        }}
      />
      {fieldError && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          {fieldError}
        </Alert>
      )}
      {fileError && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          {fileError}
        </Alert>
      )}
      <button
        className="submitpost"
        style={{ marginTop: '5px' }}
      >
        Create Post
      </button>
    </form>
  );
}
