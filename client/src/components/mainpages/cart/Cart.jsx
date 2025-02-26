// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import CartContext from '../../CartContext/CartContext'
// const Cart = () => {

// //have a get request to collect the data

//   const {userid}= useContext(CartContext)
//   const [Display,setDisplay]=useState({cart:[]})
//   const [user_Id, setUser_Id] = useState(() => sessionStorage.getItem("userId") || null);


// useEffect(()=>{
//  retrieve()
// },[])


// const retrieve=async ()=>{ 
//   try{
//   const resp=await axios.get('http://localhost:5000/cart/view',{
//     headers:{Authorization: `Bearer ${user_Id}`},
//   });
//   console.log(resp.data)
//   console.log(userid)
//   setDisplay(resp.data)
//   console.log(Display)
//   // console.log(Display.cart)
//   }
//   catch(error){
//     console.log("Some error is happening", error)
//     console.log(userid)
//   }
// }

// const deletion=async(product_id)=>{
//   try{
//   const resp=await axios.delete(`http://localhost:5000/cart/delete/${product_id}`,{
//     headers:{Authorization: `Bearer ${user_Id}`},
//   });
// }
//   catch(error){
//     console.log("An error has occured")
//   }
// }

// return (
//   <div className="max-w-7xl mx-auto py-10 px-6">
//     <h1 className="text-3xl font-semibold text-center mb-8">Your Cart</h1>
//     <ul className="space-y-6">
//       {/* Mapping over the cart array */}
//       {Display.cart.map((item) => (
//         <li
//           key={item._id}
//           className="flex items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg transition-all"
//         >
//           <div className="flex items-center space-x-4">
//             <img
//               src={item.product_id.images.url}
//               alt="Product Image"
//               className="w-24 h-24 object-cover rounded-md"
//             />
//             <div>
//               <h3 className="text-lg font-semibold">{item.product_id.title}</h3>
//               <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//               <p className="text-sm text-gray-600">Price: ${item.product_id.price}</p>
//             </div>
//           </div>
//           <div className="flex flex-col justify-between space-y-2">
//             <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all" onClick={()=>deletion(item.product_id.product_id)}>
//               Remove
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// }

// export default Cart


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CartContext from '../../CartContext/CartContext';

const Cart = () => {
  const { userid } = useContext(CartContext);
  const [Display, setDisplay] = useState({ cart: [] });
  const [user_Id, setUser_Id] = useState(() => sessionStorage.getItem("userId") || null);

  useEffect(() => {
    retrieve();
  }, []);

  const retrieve = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/cart/view', {
        headers: { Authorization: `Bearer ${user_Id}` },
      });
      console.log(resp.data);
      setDisplay(resp.data);
    } catch (error) {
      console.log("Some error is happening", error);
    }
  };

  const deletion = async (product_id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/delete/${product_id}`, {
        headers: { Authorization: `Bearer ${user_Id}` },
      });
      // Remove item from local state after deletion from backend
      setDisplay(prevState => ({
        cart: prevState.cart.filter(item => item.product_id._id !== product_id)
      }));
    } catch (error) {
      console.log("An error has occurred during deletion");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Cart</h1>
      <ul className="space-y-6">
        {Display.cart.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product_id.images.url}
                alt="Product Image"
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.product_id.title}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.product_id.price}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-2">
              <button 
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-white hover:text-black hover:border transition-all" 
                onClick={() => deletion(item.product_id._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
