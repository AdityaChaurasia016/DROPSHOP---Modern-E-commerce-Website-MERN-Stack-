import React from 'react'
import {Link} from 'react-router-dom'


const ProductList = ({product}) => {
  console.log(product)
  return (
    <div className='bg-amber-400 p-12 w-1/3'>
    <div className='product_card border border-blue-300'>
       {product.images && product.images.url ? (
        <div className='w-[250px] flex items-center justify-center h-[300px] bg-blue-500 '>
        <img src={product.images.url} className=" w-[150px] h-auto" alt="Image" />
        </div>
      ) : (
        <div className='w-[250px] flex items-center justify-center h-[300px] bg-blue-500 '></div>
      )}
       <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>${product.description}</p>
       </div>

       <div className='row-btn flex space-x-4'>
        <Link id='#btn_buy' to={`#!`} className='p-2 bg-blue-950'>
        Buy Now
        </Link>
        <Link id='#btn_view' to={`detail/${product._id}`} className='p-2 bg-blue-950'>
        View Now
        </Link>
       </div>
    </div>
    </div>
  )
}

export default ProductList