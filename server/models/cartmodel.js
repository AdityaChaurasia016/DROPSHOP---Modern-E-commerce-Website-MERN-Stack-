const mongoose = require('mongoose')
const Products = require('./productModel'); 

const cartSchema= new mongoose.Schema({
    product_id:{
        type: String,
        required: true,
        ref: 'Products'
    },
    quantity:{
        type: Number,
        required: true,
        min:1
    },
});


const userCartSchema=new mongoose.Schema({
    user_id:{
        type: String,
        required:true
    },
    cart:{
        type:[cartSchema],
        default:[]
    }
});


const Cart=mongoose.model('CartModel', userCartSchema);

module.exports = Cart;