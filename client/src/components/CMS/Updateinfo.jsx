import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Updateinfo = () => {

  const [displayvalue,setdisplayvalue]=useState({ title: '', price: '', description: '' })
  const {id} = useParams();
    console.log(id)

  const getInfo=async()=>{
    try{
    const value=await axios.get("http://localhost:5000/modify/productupdate",{
      params:{id:id}
    })
    console.log(value)
    setdisplayvalue(value.data.vals)
    console.log(value.data.vals.title)
  }
    catch(error){
      console.log({err:error})
    }
  }


  const onChangeInput=(e)=>{

    const {name, value} = e.target; 
    setdisplayvalue((prev)=>({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit=async()=>{
    try{
      const respond=await axios.put("http://localhost:5000/modify/productupdate",{...displayvalue, id})
      if(respond){
        console.log('Done')
      }
    }
    catch(errror){
      console.log("An error occured",error)
    }
  }


  useEffect(()=>{
    getInfo()
  },[])


    
  return (
    <div>
      <p>Hello {id}</p>
      <form onSubmit={handleSubmit}>
      <p>Hello {displayvalue.price}</p>
      <p>Product Name: <input type="text" name="title" value={displayvalue.title}  onChange={onChangeInput}/></p>
      <p>Product Price: <input type="number" name="price" value={displayvalue.price} onChange={onChangeInput}/></p>
      <p>Product Description: <input type="text" name="description" value={displayvalue.description} onChange={onChangeInput}/></p>
      <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Updateinfo




// here we need to update the names and other details, you can upload the image at the end