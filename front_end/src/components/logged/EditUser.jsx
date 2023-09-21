import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import cookiesOptions from '../../assets/cookie.js'



function EditUser({users, setUsers, cookies, setCookie}) {

    const [check, setCheck] = useState(
        {
            notFilled: false,
            completed: false
        }
    )
    const [input, setInput] = useState(cookies.currentUser)
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleFileInput = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))
    }

    const clickHandler = async () => {
        if (input.name !== '' && input.surname !== '' && input.location !== '' && input.email !== '' && input.password !== '' && typeof input.img === 'string' && !users.filter(e => (e.email !== cookies.currentUser.email)).find(el => el.email === input.email ) ) {
            //form data
            const formData = new FormData()
            formData.append('name', input.name)
            formData.append('surname', input.surname)
            formData.append('location', input.location)
            formData.append('email', input.email)
            formData.append('password', input.password)
            const resp = await axios.patch('http://localhost:8001/edituser/' + cookies.currentUser._id, formData)

            setInput({
                name: '',
                surname: '',
                location: '',
                email: '',
                password: '',
                img: ''
            })
            console.log('senza foto');
            const newrec = resp.data
            setUsers(prev => ([...prev, newrec]))
            setCookie('currentUser', newrec, cookiesOptions)
            setCheck(prev => ({ ...prev, completed: true }))
            setTimeout(() => { setCheck(prev => ({ ...prev, completed: false })), navigate('/logged/home') }, 2000)
        }
        else if (input.name !== '' && input.surname !== '' && input.location !== '' && input.email !== '' && input.password !== '' && typeof input.img === 'object' && !users.filter(e => (e.email !== cookies.currentUser.email)).find(el => el.email === input.email ) ) {
            //form data
            const formData = new FormData()
            formData.append('name', input.name)
            formData.append('surname', input.surname)
            formData.append('location', input.location)
            formData.append('email', input.email)
            formData.append('password', input.password)
            formData.append('img', input.img)
            const resp = await axios.patch('http://localhost:8001/edituser/' + cookies.currentUser._id, formData)

            setInput({
                name: '',
                surname: '',
                location: '',
                email: '',
                password: '',
                img: ''
            })
            console.log('con foto');
            const newrec = resp.data
            setUsers(prev => ([...prev, newrec]))
            setCookie('currentUser', newrec, cookiesOptions)
            setCheck(prev => ({ ...prev, completed: true }))
            setTimeout(() => { setCheck(prev => ({ ...prev, completed: false })), navigate('/logged/home') }, 2000)
        }
        else {
            setCheck((prev => ({ ...prev, notFilled: true })))
            setTimeout(() => setCheck(prev => ({ ...prev, notFilled: false })), 3000)

        }
    }
    
    return (
        <section className='bg-lime-100 flex flex-col p-10 gap-5 items-center'>

            <div className='flex ga'>
                <label htmlFor="name">Name:</label>
                <input onChange={changeHandler} value={input.name} className='bg-lime-50 border border-lime-600 rounded-md' type="text" name="name" id="name" />
            </div>

            <div className='flex ga'>
                <label htmlFor="surname">Surname:</label>
                <input onChange={changeHandler} value={input.surname} className='bg-lime-50 border border-lime-600 rounded-md' type="text" name="surname" id="surname" />
            </div>

            <div className='flex ga'>
                <label htmlFor="location">Home Town:</label>
                <input onChange={changeHandler} value={input.location} className='bg-lime-50 border border-lime-600 rounded-md' type="text" name="location" id="location" />
            </div>

            <div className='flex ga'>
                <label htmlFor="email">Email:</label>
                <input onChange={changeHandler} value={input.email} className='bg-lime-50 border border-lime-600 rounded-md' type="email" name="email" id="email" />
            </div>

            <div className='flex ga'>
                <label htmlFor="password">Password:</label>
                <input onChange={changeHandler} value={input.password} className='bg-lime-50 border border-lime-600 rounded-md' type="password" name="password" id="password" />
            </div>

            <div className='flex gap-3'>
                <input type="file" name='img' onChange={handleFileInput} />
            </div>

            <div>
                <div className={check.notFilled ? ' text-red-500 font-bold' : 'hidden'}>You must fill all fields or please use another Email</div>
            </div>
            <div className={check.completed ? ' text-green-900 font-bold' : 'hidden'}>
                Edited!!
            </div>
            <button onClick={clickHandler} className={check.completed ? 'hidden' : 'bg-lime-600 p-3 rounded-xl font-bold'}>
                Edit Profile
            </button>

        </section>
    )
}

export default EditUser