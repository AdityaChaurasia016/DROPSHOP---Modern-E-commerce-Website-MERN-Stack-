import React, { useState, useContext, useEffect, useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import { GlobalState } from '../../GlobalState';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { MdKeyboardArrowUp } from "react-icons/md";
import axios from 'axios';
import { BsCart2 } from "react-icons/bs"; 

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const state = useContext(GlobalState);
  const [IsSidebarOpen, setIsSidebarOpen] = state.sidebar;
  const [isAdmin, setIsAdmin] = state.isAdmin;

  
  const searchContainerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!IsSidebarOpen);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== '') {
      try {
        const res = await axios.get(`/api/search?query=${query}`);
        setSearchResults(res.data.products); 
        setIsDropdownOpen(true); 
      } catch (error) {
        console.error('Error fetching products', error);
      }
    } else {
      setSearchResults([]); 
      setIsDropdownOpen(false); 
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='flex justify-between bg-black text-white p-[20px]'>
      <div className='flex space-x-10 items-center'>
        {/* Sidebar toggle */}
        <div className='menu'>
          <button className='text-3xl cursor-pointer' onClick={toggleSidebar}>
            <GiHamburgerMenu />
          </button>
        </div>

        {/* Logo */}
        <div className='logo'>
          <h1>
            <Link to='/' className='text-4xl font-extrabold text-white tracking-wider leading-tight uppercase bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent drop-shadow-md'>
              DROPSHOP
            </Link>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative" ref={searchContainerRef}> {/* Add relative positioning for the container */}
          <div className='border border-gray-200 rounded-full p-2 w-[22em] flex items-center space-x-2'>
            <IoIosSearch size={20} color='white' />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder='Search your favourite products'
              className='w-full outline-none bg-transparent text-white placeholder-gray-400'
            />
          </div>

          {/* Search results dropdown */}
          {isDropdownOpen && searchQuery && (
            <div className="absolute bg-black shadow-lg max-h-[300px] overflow-y-auto w-[22em] top-[100%] left-0 mt-2 z-50">
              <ul>
                {searchResults.map(product => (
                  <li key={product._id}>
                    <Link to={`/detail/${product._id}`} className="block text-white px-4 py-2 hover:bg-gray-700">
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navbar Links and Cart */}
      <div className='flex justify-around items-center bg-black w-1/3'>
        <ul className='flex justify-between items-center space-x-10'>
          {/* Products Dropdown */}
          <div className="relative group">
            <button className="text-lg font-semibold text-white hover:text-gray-600 transition duration-300 ease-in-out tracking-wide uppercase">
              Products
              <span className="inline-block transition-transform duration-500 transform group-hover:rotate-180">
                <MdKeyboardArrowUp />
              </span>
            </button>
            <div className="absolute bg-black shadow-lg p-4 space-y-3 transform scale-95 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100">
              {/* <Link to="/product1" className="block text-white hover:text-gray-700">Nike</Link>
              <Link to="/product2" className="block text-white hover:text-gray-700">Adidas</Link>
              <Link to="/product3" className="block text-white hover:text-gray-700">Puma</Link>
              <Link to="/product3" className="block text-white hover:text-gray-700">US POLO</Link>
              <Link to="/product3" className="block text-white hover:text-gray-700">Woodland</Link> */}
              <Link to={`/company/Nike`} className="block text-white hover:text-gray-700">Nike</Link>
              <Link to={`/company/Adidas`}className="block text-white hover:text-gray-700">Adidas</Link>
              <Link to={`/company/Puma`}className="block text-white hover:text-gray-700">Puma</Link>
              <Link to={`/company/Woodland`}className="block text-white hover:text-gray-700">Woodland</Link>
              <Link to={`/company/USPOLO`}className="block text-white hover:text-gray-700">US POLO</Link>
            </div>
          </div>

          {/* Login and Register Links */}
          <li>
            <Link to="/login" className='text-lg font-semibold text-white hover:text-gray-700 transition duration-300 ease-in-out tracking-wide uppercase'>
              Login
            </Link>
            <span className='text-gray-400'> or </span>
            <Link to='/register' className='text-lg font-semibold text-white hover:text-gray-700 transition duration-300 ease-in-out tracking-wide uppercase'>
              Register
            </Link>
          </li>

          {/* Cart Icon */}
          <Link to='/cart'>
            <BsCart2 size={'25px'} color="white" />
          </Link>

          {/* Admin Link */}
          {isAdmin && <li><Link to='/cms' className='text-white'>Content Management</Link></li>}
        </ul>
      </div>
    </header>
  );
};

export default Header;