import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddPost({ cookies, setPosts }) {
  const navigate = useNavigate()
  
  const [errorState, setErrorState] = useState({
    filled: false,
    fields: false
  })

  const [input, setInput] = useState({
    name: '',
    description: '',
    userID: '',
    address: '',
    image: ''
  })
  const changeHandler = (e) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const imgsHandler = (e) => {
      setInput(prev => ({ ...prev, [e.target.name]: e.target.files[0]}))
  }
  const clickHandler = async() => {
    if (input.name, input.description, input.address, input.image) {
      const formData = new FormData()
      formData.append('name', input.name)
      formData.append('description', input.description)
      formData.append('address', input.address)
      formData.append('userID', cookies.currentUser._id)
      formData.append('image', input.image)

      const resp = await axios.post('http://localhost:8001/newpost', formData)
      setInput({
        name: '',
        description: '',
        userID: '',
        address: '',
        image: ''
      })
      const newRec = resp.data 
      setPosts(prev => ([...prev, newRec]))
      setErrorState(prev => ({...prev, filled: true}))
      setTimeout(() => {
        setErrorState(prev => ({...prev, filled: false})), navigate('/logged/home')
      }, 2000);
    }
    else{
      setErrorState(prev => ({...prev, fields: true}))
      setTimeout(() => {
        setErrorState(prev => ({...prev, fields: false}))
      }, 2000)
    }
  }

  if (cookies.currentUser) {

    return (
      <section className='bg-lime-100 flex flex-col p-10 gap-5 items-center'>
        <div className='flex gap-3 '>
          <label htmlFor="name">Name:</label>
          <input onChange={changeHandler} value={input.name} name='name' id='name' className='bg-lime-50 border border-lime-600 rounded-md' type="text" />
        </div>
        <div className='flex gap-3 '>
          <label htmlFor="description">Description:</label>
          <textarea onChange={changeHandler} value={input.description} className='bg-lime-50 border border-lime-600 rounded-md' name="description" id="description" cols="15" rows="5"></textarea>
        </div>
        <div className='flex gap-3 h-100% w-100%'>
          <label htmlFor="address">How get there:</label>
          <textarea onChange={changeHandler} value={input.address} className='bg-lime-50 border border-lime-600 rounded-md' name="address" id="address" cols="15" rows="5"></textarea>
        </div>
        <div className='flex gap-3 '>
          <label htmlFor="image">Images</label>
          <input onChange={imgsHandler} name='image' id='image' className='bg-lime-50 border border-lime-600 rounded-md w-44 ' type="file" />
        </div>
        <div className={errorState.filled ? 'text-green-700 font-bold' : 'hidden'}>Hey {cookies.currentUser.name} you shared your post!!!</div>
        <div className={errorState.fields ? 'text-red-700 font-bold' : 'hidden'}>You must fill all fields</div>
        <div>
          <button onClick={clickHandler} className={errorState.filled ? 'hidden' : 'bg-lime-600 p-3 rounded-xl font-bold'}>Add a Spot</button>
        </div>
      </section>
    )
  }
  else {
    navigate('/')
  }
}

export default AddPost