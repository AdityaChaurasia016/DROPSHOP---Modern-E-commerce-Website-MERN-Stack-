// import React, { useContext } from 'react'
// import { GlobalState } from '../../GlobalState'
// import './Sidebar.css'
// import { MdOutlineClose } from "react-icons/md";
// import logo from './Logo-1.png'

// const Sidebar = () => {

//     const {sidebar} = useContext(GlobalState)

//     const [IsSidebarOpen,setIsSidebarOpen]= sidebar;
    

//   return (
//     <>
//     {IsSidebarOpen && <div className='overlay'/>}
//     <div className={`sidebar ${IsSidebarOpen ? 'open' : ''}`}>
//                 <div className="sidebar-content p-4 relative">
//                 <MdOutlineClose onClick={() => setIsSidebarOpen(false)} size={30} className='absolute left-[250px] cursor-pointer'/>
//                 {/* <img src={logo}   alt="hello" className='h-10 w-11'/> */}
//                 <p className='text-2xl font-bold'>DROPSHOP</p>
//                 <div className='content'>

//                 </div>

//                 </div>
//             </div>
//     </>
//   )
// }

// export default Sidebar

import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import './Sidebar.css';
import { MdOutlineClose, MdHome, MdCategory, MdShoppingCart, MdPerson, MdLogout } from "react-icons/md";
import logo from './Logo-1.png';

const Sidebar = () => {
    const { sidebar } = useContext(GlobalState);
    const [IsSidebarOpen, setIsSidebarOpen] = sidebar;

    return (
        <>
            {IsSidebarOpen && <div className='overlay' />}
            <div className={`sidebar ${IsSidebarOpen ? 'open' : ''} flex flex-col justify-between p-6`}>
                <div className="top-section">
                    <div className="relative">
                        <MdOutlineClose onClick={() => setIsSidebarOpen(false)} size={30} className='absolute left-[250px] cursor-pointer' />
                    </div>

                    <div className="logo-section flex items-center mb-6">
                        <img src={logo} alt="Logo" className='h-10 w-11 mr-2' />
                        <p className='text-2xl font-bold'>DROPSHOP</p>
                    </div>

                    <div className="menu flex flex-col gap-6 mt-4">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <MdHome size={24} />
                            <p>Home</p>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <MdCategory size={24} />
                            <p>Categories</p>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <MdShoppingCart size={24} />
                            <p>Orders</p>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <MdPerson size={24} />
                            <p>Profile</p>
                        </div>
                    </div>
                </div>

                <div className="logout mt-auto flex items-center gap-3 cursor-pointer">
                    <MdLogout size={24} />
                    <p>Logout</p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
