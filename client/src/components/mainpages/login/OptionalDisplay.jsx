// for the not logged in and for first time register
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const OptionalDisplay = () => {

    const [present,setPresent] = useState(true)
    const [register, setRegister] = useState(false)

    const handleLoginClick=()=>{
        setPresent(false)
    }
   

    useEffect(()=>{
        const firstRegister =localStorage.getItem('Register')
    if(firstRegister){
        setRegister(true)
        
        const timer= setTimeout(()=>{
            setRegister(false)
            localStorage.removeItem('Register');
        },10000);

        return ()=> clearTimeout(timer)
    }
    },[])


    useEffect(()=>{
    
    const cookie_check=(document.cookie.match(/^(?:.*;)?\s*loginStatus\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]

    if(cookie_check){    
        setPresent(false)
    }
    },[])

  
    return (
        <div className='w-full'>
          {present && <p>You are not logged in. Please click <Link to='/login' onClick={handleLoginClick}>here</Link> to login</p>}
          {register && <h1>Welcome, this is your first registration</h1>}
        </div>

)
}

export default OptionalDisplay
