import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useEffect, useState} from 'react';
import LogHeader from './components/logged/LogHeader';
import AddPost from './components/logged/AddPost';
import Post from './components/Post';
import EditPost from './components/logged/EditPost'
import User from './components/User';


function App() {
  const [users, setUsers] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('http://localhost:8001/getusers')
      setUsers(res.data)
    }
    const getPosts = async () => {
      const res = await axios.get('http://localhost:8001/getposts')
      setPosts(res.data)
    }
    getUsers()
    getPosts()
  }, [])
  return (
    <Router>
      {cookies.currentUser ? (<LogHeader removeCookie={removeCookie} cookies={cookies} />) : (<Header />)}
      <Routes>
        <Route path='/' element={<Home posts={posts} users={users} />} />
        <Route path='/:id' element={<Post users={users} posts={posts} setPosts={setPosts} cookies={cookies} />} />
        <Route path='/signup' element={<SignUp setUsers={setUsers} users={users} />} />
        <Route path='/login' element={<Login users={users} setCookie={setCookie} />} />
        <Route path='/logged/home' element={<Home posts={posts} users={users} />} />
        <Route path='/logged/editplace/:id' element={<EditPost cookies={cookies} setPosts={setPosts} posts={posts} />} />
        <Route path='/logged/addaplace' element={<AddPost cookies={cookies} setPosts={setPosts} />} />
        <Route path='/logged/user/:id' element={<User cookies={cookies} users={users} setUsers={setUsers} posts={posts} setPosts={setPosts} removeCookie={removeCookie} />} />
      </Routes>


      <Footer cookies={cookies} />
    </Router>
  )
}

export default App
