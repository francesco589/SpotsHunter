import { useState } from "react"
import { Link } from "react-router-dom"

function Header() {

    const [click, Setclick] = useState(false)

    const menuHandler = () => {
        Setclick(prev => !prev)
    }
    
   
    return(
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
                <ul className="gap-3 hidden md:flex">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>SignUp</Link></li>
                </ul>
            </nav>
            </div>
            <nav >
                <ul className={click ? 'md:hidden border border-top border-lime-400 w-full p-2 flex justify-end gap-2':'hidden'}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>SignUp</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header