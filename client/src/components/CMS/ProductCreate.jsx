import React, {useState} from 'react'
import axios from 'axios'
const ProductCreate = () => {

    const [create,setcreate]=useState({title:'',price:'',description:'',content:''});
    
    const handleSubmit = ()=>{
      try{
      const response = axios.post('http://localhost:5000/modify/productcreate',{...create})
      if(response){
        console.log("Successful")
      }
      else{
        console.log("An error ocurred")
      }
      }
      catch(err){
        console.log("An error occured", err)
      }
    }

    const onChangeInput=(e)=>{
      const {name,value}= e.target;
      setcreate((prev)=>({
        ...prev,
        [name]:value
      }));
    }


  return (
    <div>
       <div>
      <p>Hello</p>
      <form onSubmit={handleSubmit}>
      <p>Hello</p>
      <p>Product ID: <input type="text" name="product_id" value={create.product_id}  onChange={onChangeInput}/></p>
      <p>Product Name: <input type="text" name="title" value={create.title}  onChange={onChangeInput}/></p>
      <p>Product Price: <input type="number" name="price" value={create.price} onChange={onChangeInput}/></p>
      <p>Product Description: <input type="text" name="description" value={create.description} onChange={onChangeInput}/></p>
      <p>Content <input type="text" name="content" value={create.content} onChange={onChangeInput}/></p>
      <button type='submit'>Create</button>
      </form>
    </div>
    </div>
  )
}

export default ProductCreate;
