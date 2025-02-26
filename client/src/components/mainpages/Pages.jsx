import React from 'react'
import Product from './products/Product'
import Login from './login/Login'
import Register from './login/Register'
import Cart from './cart/Cart'
import {Route, Routes} from 'react-router-dom'
import DetailProduct from './utils/DetailProducts/DetailProduct'
import CartManagement from '../CMS/CartManagement'
import Updateinfo from '../CMS/Updateinfo'
import ProductCreate from '../CMS/ProductCreate'
import AdminLogin from './login/AdminLogin'
import BrandProducts from '../BrandProducts/BrandProducts'

const Pages = () => {
  return (
   <Routes>
      <Route path='/' element={<Product/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/detail/:id' element={<DetailProduct/>}/>
      <Route path='/cms' element={<CartManagement/>}/>    
      <Route path='/productUpdate/:id' element={<Updateinfo/>}/>
      <Route path='/productCreate' element={<ProductCreate/>}/>
      <Route path='/adminLoginn' element={<AdminLogin/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/company/:brand' element={<BrandProducts/>}/>

   </Routes>
   
  )
}

export default Pages