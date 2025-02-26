const express = require('express');
const router= express.Router();
const cart =require('./cart');

router.route('/addtocart')
.post(cart.add);


router.route('/view')
.get(cart.view);

router.route('/delete/:product_id')
.delete(cart.delete);


module.exports= router