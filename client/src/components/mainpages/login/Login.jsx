import axios from 'axios'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Login = () => {

  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const [message,setMessage]=useState('')
  const [loggedin, setLoggedin]=useState(false)

  const onChangeInput=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value})
  }



  const loginSubmit=async (e)=>{
    e.preventDefault()

    try{
      const value=await axios.post('http://localhost:5000/user/login',{...user})
      if(value){
      localStorage.setItem('firstLogin', true)
      setLoggedin(true)
      setMessage('Login successful! Redirecting...');
      setTimeout(()=>{
        window.location.href="/"
      },1000)
    }
    }
    catch(err){
      // alert(err.response?.data?.msg || "An error Occured")
      setMessage(err.response?.data?.msg || "An error Occured")
    }
  }



  return (
    <div className='login-page'>
      {!loggedin && <form onSubmit={loginSubmit}>
        <input type="email" name='email' required placeholder='Email' value={user.email} onChange={onChangeInput}/>
        <input type="password" name='password' required placeholder='Password' value={user.password} onChange={onChangeInput}/>

        <div className='row'>
          <button type='submit'>Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>}
      <div className='fixed top-[50%] left-[40%]'>
      {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default Login
