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
            <Link to='/' >30dc Shop</Link>
        </h1>
      </div>

        <div className='flex justify-around items-center bg-blue w-1/3' >
          <ul className='flex justify-between space-x-10 '>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/login">Login</Link> or <Link to='/register'>Register</Link></li>

        <li>
            <MdClose className='text-3xl'/>
        </li>
        </ul>

        <div className=''>
            <span>0</span>
            <Link><IoMdCart className='text-3xl' /> </Link>
        </div>
        </div>

    </header>
  )
}

export default Header 
  