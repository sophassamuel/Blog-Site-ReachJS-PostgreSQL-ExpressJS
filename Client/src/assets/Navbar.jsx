import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <header className='Header'>
      <Link to='/' className='logo'>Blogs</Link>
      <nav className='sidebar'>
        <Link to='/createPost' className='sidebar'>Create Post</Link>
      </nav>
    </header>
  );
}

export default Navbar;
