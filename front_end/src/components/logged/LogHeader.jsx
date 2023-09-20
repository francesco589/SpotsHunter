import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function LogHeader({ cookies, removeCookie }) {

    const [click, Setclick] = useState(false)
    const navigate = useNavigate()
    const menuHandler = () => {
        Setclick(prev => !prev)
    }

    const signOff = () => {

        removeCookie('currentUser'),
            navigate('/')
    }
    return (
        <header className="bg-lime-300 text-lime-700 flex flex-col ">
            <div className=" p-3 flex justify-between items-center">
                <h1 className="font-extrabold  text-3xl">Spots Hunter</h1>
                <nav className="flex gap-3 ">
                    <div className="md:hidden">
                        <button onClick={menuHandler} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>

                    </div>
                    <ul className="gap-3 hidden md:flex items-center">
                        <li><Link to='/logged/Home'>Home</Link></li>
                        <li><Link to='/logged/addaplace'>Add a Place</Link></li>
                        <li><Link to={'/logged/user/' + cookies.currentUser._id}>{cookies.currentUser.name}</Link></li>
                        <li>
                            <img className=' w-10 h-10 rounded-full' src={`http://localhost:8001/users/${cookies.currentUser.img}`} alt="" />
                        </li>
                        <li>
                            <button onClick={signOff}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <nav >
                <ul className={click ? 'md:hidden border border-top border-lime-400 w-full p-2 flex justify-end items-center gap-2' : 'hidden'}>
                    <li><Link to='/logged/home'>Home</Link></li>
                    <li><Link to='/logged/addaplace'>Add a Place</Link></li>
                    <li><Link to={'/logged/user/' + cookies.currentUser._id}>{cookies.currentUser.name}</Link></li>
                    <li>
                        <img className=' h-10 w-10 border border-spacing-2 border-lime-700 rounded-full' src={`http://localhost:8001/users/${cookies.currentUser.img}`} alt="" />
                    </li>
                    <li>
                        <button onClick={signOff}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default LogHeader