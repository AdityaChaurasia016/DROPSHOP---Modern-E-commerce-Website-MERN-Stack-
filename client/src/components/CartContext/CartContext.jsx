import React from 'react';
import { createContext, useState, useContext} from 'react'

const CartContext = createContext();

export const CartProvider = ({children})=>{
    const [cart, setcart] = useState([]);
    // const [cart, setcart] = useState({user_id:'', product_id:'', quantity:''});
    const [userid, setUserid]= useState('')
    return(
        <CartContext.Provider value={{cart,setcart, userid,setUserid}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;