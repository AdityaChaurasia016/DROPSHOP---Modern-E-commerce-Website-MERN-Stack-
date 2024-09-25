import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList/ProductList'

const Product = () => {

  const state=useContext(GlobalState)
  const [products] = state.productAPI.products
  
  // console.log(state)
  return (
    <div className='products flex flex-wrap'>
      {
        products.map((product,index) =>{
          return <ProductList key={product._id} product={product}/>
        })
      }
      
    </div>
  )
}

export default Product
