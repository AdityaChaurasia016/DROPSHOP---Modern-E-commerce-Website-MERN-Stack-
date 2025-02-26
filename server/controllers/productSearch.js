const Products=require('../models/productModel')


const productSearch={
    getProduct:async(req,res)=>{
        try {
            const { query } = req.query;
            const products = await Products.find({
              $or: [
                { product_id: { $regex: query, $options: 'i' } }, // search by product_id (case-insensitive)
                { title: { $regex: query, $options: 'i' } } // search by title (case-insensitive)
              ]
            });
        
            res.json({ products });
          } catch (error) {
            res.status(500).json({ msg: error.message });
          }
    },
    getBrandProduct:async(req,res)=>{
      try{
        const {brand}= req.query;
        const products = await Products.find({
          $or:
          [
            {product_id: {$regex: brand, $options: 'i'}},
            {title: {$regex: brand, $options: 'i'}}
          ]
        })

        res.status(200).json({products})
      }
      catch(error){
        res.status(500).json({msg:"An error ocurred", error:error.message})
      }
    }
}

module.exports = productSearch