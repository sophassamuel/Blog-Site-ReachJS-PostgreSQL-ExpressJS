import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Indexpage from './pages/Indexpg'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/Postpage'
import EditPost from './pages/Editpost'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Indexpage/>}/>
        <Route path={'/createPost'} element={<CreatePost/>} />
        <Route path={'/post/:id'} element={<PostPage/>} />
        <Route path={'/:id/edit'} element={<EditPost/>} />
      </Route>
    </Routes>


  )
}

export default App
