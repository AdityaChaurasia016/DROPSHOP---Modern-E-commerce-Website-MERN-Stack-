import React, { useContext, useState } from 'react'
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const admin = useContext(GlobalState)
  const [isAdmin, setisAdmin] = admin.isAdmin
  const navigate = useNavigate()

  const [display, setDisplay] = useState('');
  const [visible, setVisible] = useState(false);
  const [Values, setValues] = useState({
    email: '',
    password: ''
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value })
  }

  const Submitted = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post('http://localhost:5000/user/adminlogin', Values)
      if (resp) {
        setVisible(true)
        setTimeout(() => {
          setVisible(false);
          navigate('/');
        }, 2000);
        setisAdmin(true)
      }
      else {
        setDisplay("Invalid Credentials")
      }
    }
    catch (err) {
      console.log({ err })
    }
  }

  return (
    <div className="flex h-[90vh]">
      {/* Left Side - Logo */}
      <div className="w-1/2 flex justify-center items-center bg-black">
        <h1 className="text-white text-6xl font-extrabold">DROPSHOP</h1>
      </div>

      {/* Right Side - Admin Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="p-12 shadow-lg rounded-lg w-[30rem] bg-black">
          <h2 className="text-3xl font-semibold text-center mb-6 text-white">Admin Login</h2>
          <form onSubmit={Submitted} className="space-y-6">
            <input
              type="text"
              name="email"
              value={Values.email}
              placeholder="Email"
              onChange={onChangeInput}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white bg-black"
            />
            <input
              type="password"
              name="password"
              value={Values.password}
              placeholder="Password"
              onChange={onChangeInput}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white bg-black"
            />
            <button
              type="submit"
              className="w-full bg-white text-black p-4 rounded-lg hover:bg-black hover:text-white hover:border transition"
            >
              Submit
            </button>
          </form>
          {visible && <p className="text-center text-white mt-4">Redirecting...</p>}
          {display && <p className="text-center text-red-500 mt-4">{display}</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
