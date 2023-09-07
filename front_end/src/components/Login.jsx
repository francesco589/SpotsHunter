import React, { useState } from 'react'
import cookiesOptions from '../assets/cookie.js'
import { useNavigate } from 'react-router-dom'

function Login({ users, setCookie }) {
    const navigate = useNavigate()
    const [logInp, setLogInp] = useState({
        email: '',
        password: ''
    })
    const [showRend, setShowRend] = useState({
        isLogged: false,
        isFilled: false
    })
    const changeHandler = (e) => {
        setLogInp(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const clickHandler = () => {
        const logUser = users.find(user => (
            user.email === logInp.email && user.password === logInp.password
        ))
        if (logUser) {
            setCookie('currentUser', logUser, cookiesOptions)
            setShowRend(prev => ({ ...prev, isLogged: true }))
            setTimeout(() => { setShowRend(prev => ({ ...prev, isLogged: false })), navigate('/logged') }, 2000)
        }
        else {
            setShowRend(prev => ({ ...prev, isFilled: true }))
            setTimeout(() => { setShowRend(prev => ({ ...prev, isFilled: false }))}, 2000)
        }
    }

    return (
        <section className='justify-center flex flex-col items-center p-5 gap-4 bg-lime-100'>
            <div >
                <label htmlFor="email">
                    Email:
                </label>
                <input value={logInp.email} onChange={changeHandler} className='bg-lime-50 border border-lime-600 rounded-md' type="email" id='email' name='email' />
            </div>
            <div>
                <label htmlFor="password">
                    Password:
                </label>
                <input value={logInp.password} onChange={changeHandler} className='bg-lime-50 border border-lime-600 rounded-md' type="password" id='password' name='password' />
            </div>
            <div>
                <div className={showRend.isLogged ? ' text-green-700 font-bold' : 'hidden'}>
                    Loading...
                </div>
                <div className={showRend.isFilled ? 'text-red-600 font-bold' : 'hidden'}>
                    Wrong Credentials
                </div>
            </div>
            <button onClick={clickHandler} className={showRend.isLogged ? 'hidden' : 'bg-lime-600 p-3 rounded-xl font-bold'}>Login</button>
        </section>
    )
}

export default Login