import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
