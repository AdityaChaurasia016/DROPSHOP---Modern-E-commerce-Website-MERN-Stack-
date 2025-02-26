import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { MdCreate } from "react-icons/md";
import ErrorImage from './ErrorImage.jpg';

import './cart.css'

const CartManagement = () => {

    const [prod,setprod]=useState([])

    const response=async()=>{
        try{
            const resp=await axios.get('http://localhost:5000/modify/productss')
            setprod(resp.data.products )
            console.log(resp)
        }
        catch(err){
           console.log("error",err)
        }
    }
    
    useEffect(()=>{
        response()
    },[])


    // const DeleteItem=async (product)=>{
    //   try{
    //   const identity=product._id
    //   const deletion= await axios.delete('http://localhost:5000/modify/productss', {data:{productId: identity}})
    //   if(deletion){
    //     console.log("successful")
    //   }
    //   else{
    //     console.log("failure")
    //   }}
    //   catch{
    //     console.log("unknown error")
    //   }
    // }
    
    const [deletion, setDeletion] =useState(false)
    const [deleteid, setDeleteid] = useState()

    const DeleteItem=(id)=>{
      setDeletion(!deletion)
      setDeleteid(id)
    }


    const YesorNo =async(choice, id)=>{
      try{
        if(choice === "Yes"){
          const respond=await axios.delete('http://localhost:5000/modify/productdelete',{data:{id}})

          if(respond){
            console.log("Successful")
            setDeletion(!deletion)
            window.location.reload();
            
          }
          else{
            console.log("Unsuccessful")
          }
        }
        else{
          console.log("No button clicked")
          setDeletion(!deletion)
        }
      }
      catch(error){
        console.log("An error has occured", error.response?.data || error.message)
      }
    }

  return (
    <div className='border relative'>
      <Link to='/productcreate' className='p-4 border flex items-center justify-center '>
      <MdCreate  size={30}/><p className='font-'>Create a Product</p>
        </Link>
      <div className='flex flex-wrap gap-12 p-2 justify-center'>
      {prod.map((product, index)=>(
        <div className='border h-[auto]' key={index}>
          <img src={product.images?.url || ErrorImage} alt="image" className='w-[200px] h-[200px] mb-2' />
          <p className='font-host text-xl uppercase'>{product.title}</p>
          <p className='font-host uppercase'><span className='mr-2'> Price: </span>₹{product.price}</p>
          <div className='flex justify-around'>
          <button className="font-host" onClick={()=>DeleteItem(product._id)}>Delete</button>
          <Link to={`/productUpdate/${product._id}`}>Update</Link>
          </div>
        </div>
      ))}
      {deletion && (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border p-6 bg-white shadow-lg z-50">
    <p className="text-2xl">Product: {deleteid}</p>
    <p>Are you sure you want to delete this product?</p>
    <div className="flex space-x-5 mt-4">
      <button className="bg-black text-white px-4 py-2 rounded" onClick={() => YesorNo("Yes", deleteid)}>Yes</button>
      <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => YesorNo("No", deleteid)}>No</button>
    </div>
  </div>
)}
      </div>
    </div>
  )
}

export default CartManagement
