const User = require('../models/userModel')
const Products = require('../models/productModel')
const Cart = require('../models/cartmodel')

const control ={
    add:async(req,res)=>{
        try{
        // const {user_id, product_id, quantity}=req.body.cart;
        const { user_id, product_id, quantity } = req.body;
        const product=await Products.findOne({product_id})
        if(!product){
            return res.status(404).json({msg:"Product not found"});
        }

        let userCart = await Cart.findOne({user_id});
        if(!userCart){
            userCart = new Cart({ user_id, cart:[]})
        }

        const cartItem = userCart.cart.find(item =>item.product_id === product_id)

        if(cartItem){
            cartItem.quantity += quantity;
        }
        else{
            userCart.cart.push({product_id, quantity});
        }

        await userCart.save();

        return res.status(200).json({message: "Product added to Cart", cart: userCart});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'Server error'});
    }
},
    view:async(req,res)=>{
        try{
            const user_id = req.headers.authorization?.split(' ')[1]

            const userCart = await Cart.findOne({user_id}).populate({
                path: 'cart.product_id',
                model: 'Products',
                localField: 'cart.product_id',
                foreignField: 'product_id',
                select: 'images title price description',
            })
            if(!userCart){
                return res.status(404).json({message: "Cart not found"});
            }

            return res.status(200).json({cart: userCart.cart})
        }
        catch(error){
            console.log(error)
            return res.status(500).json({error})
        }
    },
    delete:async(req,res)=>{
        try{
            const userid=req.headers.authorization?.split(' ')[1]
            const {product_id}=req.params;
            const product=await Cart.findOne({user_id:userid})
            if(product){
                product.cart=product.cart.filter(item=> item.product_id !==product_id)
                await product.save()
            }
            
            res.status(200).json({msg:"Successful",product})
        }
        catch(error){
            res.status(400).json({msg:"Some error has occured"})
        }
    }
}   

module.exports = control