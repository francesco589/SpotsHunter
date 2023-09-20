import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'



function Post({ posts, setPosts, users, cookies }) {
    const param = useParams()
    const [addbtn, setAddBtn] = useState(false)
    const navigate = useNavigate()
    const clickAddress = () => {
        setAddBtn(prev => (!prev))
    }
    const delHandler = async (ev, id) => {
        if (cookies.currentUser._id === id.userID) {
            await axios.delete('http://localhost:8001/deletepost/' + id._id)
            setPosts(prev => prev.filter(el => el._id !== id._id))
            setTimeout(() => {
                navigate('/logged/home')
            }, 2000);
        }
    }


    return (
        <section className="bg-lime-100 w-screen" >
            {posts.filter(el => el._id == param.id).map((elem, i) => (
                <div key={i + 100} className='flex flex-col  gap-4 p-6 items-center'>
                    <h1 className='font-bold'>{elem.name}</h1>
                    <img className=' w-64' src={"http://localhost:8001/posts/" + elem.image} alt={elem.name} />
                    <p>{elem.description}</p>
                    <div className='text-xs font-medium self-start'>
                        Shared from: <p className='font-bold'>{users.find(el => el._id === elem.userID).name + ' ' + users.find(el => el._id === elem.userID).surname}</p>
                        <div className={cookies.currentUser ? elem.userID === cookies.currentUser._id ? 'flex gap-2 p-3 justify-between' : 'hidden' : 'hidden'} >
                        <button onClick={(eve) => delHandler(eve, elem)} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                        <Link to={'/logged/editplace/'+ elem._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>

                        </Link>
                        </div>
                    </div>
                    <div className='text-center'>
                        <p>Where</p>
                        <button onClick={clickAddress}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </button>
                    </div>

                    <div className={addbtn ? " text-sm" : "hidden"}>

                        <p>{elem.address}</p>
                    </div>
                    <Link className='bg-lime-600 p-3 rounded-xl font-bold' to={cookies.currentUser ? '/logged/home' : '/'}>Back</Link>
                </div>
            ))}

        </section>
    )
}

export default Post