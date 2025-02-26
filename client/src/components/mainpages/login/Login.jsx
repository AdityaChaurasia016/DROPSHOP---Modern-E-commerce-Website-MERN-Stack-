import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartContext from '../../CartContext/CartContext'

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [loggedin, setLoggedin] = useState(false)
  const { cart, setcart, userid, setUserid } = useContext(CartContext)

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      const value = await axios.post('http://localhost:5000/user/login', { ...user }, { withCredentials: true })
      const { accesstoken, user_id } = value.data
      if (value) {
        sessionStorage.setItem("userId", user_id)
        setUserid(user_id)
        setcart((prevcart) => ({ ...prevcart, user_id }))
        localStorage.setItem('Login', true)
        setLoggedin(true)
        setMessage('Login successful! Redirecting...');
        setTimeout(() => { navigate('/'); }, 1000)
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "An error Occurred")
    }
  }

  return (
    <div className="flex h-[90vh]">
      {/* Left Side - Logo */}
      <div className="w-1/2 flex justify-center items-center bg-black">
    
        <h1 className="text-white text-6xl font-extrabold">DROPSHOP</h1>

      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="p-12 shadow-lg rounded-lg w-[30rem] bg-black">
          <h2 className="text-3xl font-semibold text-center mb-6 text-white">Login</h2>
          {!loggedin && (
            <form onSubmit={loginSubmit} className="space-y-6">
              <input type="email" name='email' required placeholder='Email' value={user.email} onChange={onChangeInput} className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white bg-black" />
              <input type="password" name='password' required placeholder='Password' value={user.password} onChange={onChangeInput} className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white bg-black" />
              <button type='submit' className="w-full bg-white text-black p-4 rounded-lg hover:bg-black hover:text-white hover:border transition">Login</button>
            </form>
          )}
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
          <div className="text-center mt-4">
            <p className="text-white">Dont have an account?
            <Link to="/register" className="text-white hover:underline"> Register now</Link>
            </p>
          </div>
          <div className="text-center mt-2">
            <Link to="/adminLoginn" className="text-gray-400 hover:underline">Login as Admin</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
