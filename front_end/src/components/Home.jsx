import { Link } from "react-router-dom"

function Home({ posts, users, cookies }) {

    return (
        <section className="bg-lime-100">
            <section className="flex gap-3 flex-wrap justify-center">
                {posts.map((el, i) => (
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
            </section>
        </section>
    )
}

export default Home