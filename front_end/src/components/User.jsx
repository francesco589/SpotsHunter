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
            <nav className='flex gap-3'>
                <ul>
                    <button onClick={delHandler}>delete your Profile</button>
                </ul>
                <ul>
                    <Link>edit your profile</Link>
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