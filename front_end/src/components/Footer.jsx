import { Link } from 'react-router-dom'
import React from 'react'

function Footer({ cookies }) {

  return (
    <footer className='bg-lime-300 text-lime-700 p-5 flex justify-between items-center'>
      {cookies.currentUser ?
        <ul>
          <li><Link to='/logged/Home'>Home</Link></li>
          <li><Link to='/logged/addaplace'>Add a Place</Link></li>
          <li><Link to={'/logged/user/' + cookies.currentUser._id}>{cookies.currentUser.name}</Link></li>
        </ul>
        :
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>SignUp</Link></li>
        </ul>
      }

      <div>
        Credits
      </div>
    </footer>
  )
}

export default Footer