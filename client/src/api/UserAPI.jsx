import React , {useState, useEffect} from 'react'

import axios from 'axios'
// import { GlobalState } from '../GlobalState'

const UserAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(()=>{
        if(token){
            const getUser = async()=>{
                try{
                    const res = await axios.get('user/infor',{
                        headers:{Authorization:token}
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true):setIsAdmin(false)

                    console.log(res)
                }
                catch(error){
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])
  return (
    <div>
      isLogged:[isLogged, setIsLogged],
      isAdmin:[isAdmin, setIsAdmin]
    </div>
  )
}

export default UserAPI
