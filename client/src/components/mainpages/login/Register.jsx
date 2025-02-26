import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async (e) => {
    e.preventDefault()

    try {
      const resp = await axios.post('http://localhost:5000/user/register', { ...user }, { withCredentials: true })
      const { userid } = resp.data
      localStorage.setItem('Register', true)
      sessionStorage.setItem('userId', userid)
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.msg || "An error Occurred")
    }
  }

  return (
    <div className="flex h-[90vh]">
      {/* Left Side - Logo */}
      <div className="w-1/2 flex justify-center items-center bg-black">
        <h1 className="text-white text-6xl font-extrabold">DROPSHOP</h1>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="p-12 shadow-lg rounded-lg w-[30rem] bg-black">
          <h2 className="text-3xl font-semibold text-center mb-6 text-white">Register</h2>
          <form onSubmit={registerSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              required
              placeholder="Username"
              value={user.name}
              onChange={onChangeInput}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white bg-black"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={user.email}
              onChange={onChangeInput}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white bg-black"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={user.password}
              onChange={onChangeInput}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white bg-black"
            />
            <button
              type="submit"
              className="w-full bg-white text-black p-4 rounded-lg hover:bg-black hover:text-white hover:border transition"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-white">Already have an account? 
              <Link to="/login" className="text-white hover:underline"> Login now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
