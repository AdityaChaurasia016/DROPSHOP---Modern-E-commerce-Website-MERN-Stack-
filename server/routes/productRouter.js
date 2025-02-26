// const router = require('express').rou
const express=require('express')
const router= express.Router()
const productCtrl=require('../controllers/productCtrl')
const productSearch = require('../controllers/productSearch')

router.route('/products')
.get(productCtrl.getProducts)
.post(productCtrl.createProducts)

router.route('/products/:id')
.delete(productCtrl.deleteProduct)
.put(productCtrl.updateProduct)


router.route('/search')
.get(productSearch.getProduct)

router.route('/company')
.get(productSearch.getBrandProduct)

// router.get('/search', async (req, res) => {
//     try {
//       const { query } = req.query;
//       const products = await Products.find({
//         $or: [
//           { product_id: { $regex: query, $options: 'i' } }, // search by product_id (case-insensitive)
//           { title: { $regex: query, $options: 'i' } } // search by title (case-insensitive)
//         ]
//       });
  
//       res.json({ products });
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   });


module.exports=router