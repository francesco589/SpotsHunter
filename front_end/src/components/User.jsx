import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function User({ cookies, posts, users, setPosts, removeCookie, setUsers }) {
    const navigate = useNavigate()
    const delHandler = async () => {

        if (confirm('Are you sure? Your profile and all your content will be deleted!!')) {
            posts.forEach(el => {
                if (el.userID === cookies.currentUser._id) {
                    axios.delete('http://localhost:8001/deletepost/' + el._id).then(res => console.log(res.data.name + 'deleted'))
                }
            })


            setTimeout(() => {
                axios.get('http://localhost:8001/getposts/').then(res => setPosts(res.data))
                axios.delete('http://localhost:8001/deleteuser/' + cookies.currentUser._id)
                    .then(res => setUsers(prev => (prev.filter(el => el._id !== res.data._id))))
                navigate('/logged/home'),
                    removeCookie('currentUser')
            }, 3000);

        }
    }

    return (
        <section className='bg-lime-100 flex flex-col p-5 gap-5 items-center text-lime-700'>
            <nav className='flex gap-3 justify-between w-full'>
                <ul>
                    <button className='bg-red-300 p-2 rounded-xl flex gap-2' onClick={delHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        delete your Profile
                    </button>
                </ul>
                <ul >
                    <Link className='bg-blue-300 p-2 rounded-xl flex gap-2' to={'/logged/user/edituser/' + cookies.currentUser._id}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        edit your profile
                    </Link>
                </ul>
            </nav>
            <h1>Hello {cookies.currentUser.name}!</h1>
            <div className='flex flex-wrap justify-center p-10'>
                {posts.filter(e => e.userID === cookies.currentUser._id).map((el, i) => (
                    <Link to={'/' + el._id} className="p-5 m-5 " key={i + 1001}>
                        <div>
                            <img className="w-56" src={"http://localhost:8001/posts/" + el.image} alt={el.image} />
                        </div>
                        <p className="w-56 text-center font-bold">{el.name}</p>
                        <div className="w-56 text-center text-sm">
                            Posted by <p className="font-semibold">{users.find(elem => (elem._id === el.userID)).name + ' ' + users.find(elem => (elem._id === el.userID)).surname}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    )
}

export default User