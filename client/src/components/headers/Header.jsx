import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from 'react-icons/md'
import { IoMdCart } from "react-icons/io";
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <header className='flex justify-between'>
      <div className='menu'>
      <GiHamburgerMenu className='text-3xl'/>
      </div>

      <div className='logo'>
        <h1>
            <Link to='/' className='text-4xl font-extrabold text-blue-600 tracking-wider leading-tight uppercase bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent drop-shadow-md' >CIA3.com</Link>
        </h1>
      </div>

        <div className='flex justify-around items-center bg-blue w-1/3' >
          <ul className='flex justify-between space-x-10 '>
        <li><Link to="/" className='text-lg font-semibold text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out tracking-wide uppercase'>Products</Link></li>
        <li><Link to="/login" className='text-lg font-semibold text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out tracking-wide uppercase'>Login</Link><span className='text-gray-400'> or </span><Link to='/register' className='text-lg font-semibold text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out tracking-wide uppercase'>Register</Link></li>

        {/* <li>
            <MdClose className='text-3xl'/>
        </li> */}
        </ul>

        {/* <div className=''>
            <span>0</span>
            <Link><IoMdCart className='text-3xl' /> </Link>
        </div> */}
        </div>

    </header>
  )
}

export default Header 
  