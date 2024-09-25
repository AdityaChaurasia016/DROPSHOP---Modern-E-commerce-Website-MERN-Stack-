import React,{useState, useEffect} from 'react'
import axios from 'axios'

const ProductAPI = () => {

    const [products,setProducts]=useState([])

    const getProducts=async()=>{
        const res=await axios.get('/api/products')
        //console.log(res.data)
        setProducts(res.data.products)
        // console.log(res.data)
        // console.log("Hello")
    }

    useEffect(()=>{
        getProducts()
    },[])

 
  return {  
    products:[products,setProducts]
  }
}

export default ProductAPI 
