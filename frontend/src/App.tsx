import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import {Blogs} from './pages/Blogs'
import { Publish } from './pages/Publish'
import { AuthorPage } from './pages/AuthorPage'
import { EditPost } from './pages/EditPost'
import { Profile } from './pages/Profile'
import { Drafts } from './pages/Drafts'
import { Appbar } from './components/Appbar'



function App() {

  return (
    <>
      <BrowserRouter>
      <Appbar></Appbar>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs/>}></Route>
          <Route path="/publish" element={<Publish/>}></Route>
          <Route path="/me" element={<Profile/>}></Route>
          <Route path="/editPost/:id" element={<EditPost/>}></Route>
          <Route path="/user/:id" element={<AuthorPage/>}></Route>
          <Route path='/drafts' element={<Drafts/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
