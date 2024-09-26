import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

const DetailProduct = () => {

    const params = useParams()
    const state=useContext(GlobalState)
    const [products]=state.productAPI.products
    const [detailProduct,setDetailProduct] = useState([])


    useEffect(()=>{
        if(params){
            products.forEach(product =>{
                if(product._id === params.id)
                    setDetailProduct(product)
            })
        }
    },[params,products])

    if(detailProduct.length === 0)
      return null;
    console.log({detailProduct})

  return (
    <div>
      <div className='image border border-blue-200 p-12 flex'>
      {detailProduct.images && detailProduct.images.url ?(
        <div className='detail border border-blue-700 w-1/2'>
        <img src={detailProduct.images.url} alt="" className='w-[300px] h-[500px]' />
      </div>):(<p>No image available</p>)
      }
      <div className='box-detail m-12 flex flex-col space-y-6'>
        <div className='row '> 
          <h2 className='text-blue-600 text-3xl'>{detailProduct.title}</h2>
          
        </div>
        <h6>{detailProduct.product_id}</h6>

      <span>Price- ${detailProduct.price}</span>
      <p>${detailProduct.description}</p>
      <p>{detailProduct.content}</p>
      <p>Sold:{detailProduct.sold}</p>
      <Link to='/cart' className='cart py-3 px-2 text-center transition duration-300 border hover:bg-white hover:text-black hover:border-blue-500 bg-blue-500 text-white'>Buy Now</Link>
      </div>
      </div>
    </div>
  )
}

export default DetailProduct