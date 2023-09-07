import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react';
import LogHeader from './components/LogHeader';
import LogHome from './components/LogHome';


function App() {
const [users, setUsers] = useState([])
const [cookies, setCookie, removeCookie] = useCookies()


useEffect(()=> {
  const getUsers = async () => {
    const res = await axios.get('http://localhost:8001/getusers')
    setUsers(res.data)
  }
 getUsers()
} ,[])
  return (
    <Router>
      {cookies.currentUser ? (<LogHeader removeCookie={removeCookie} cookies={cookies}/>) : (<Header />)}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp setUsers={setUsers} users={users} />} />
        <Route path='/login' element={<Login users={users} setCookie={setCookie} />} /> 
        <Route path='/logged' element={<LogHome/>} />
        {/*
      
     
  <Route path='/' element={<H/>} />*/}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
