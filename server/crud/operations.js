const Products=require('../models/productModel')

const operations={
    getProd:async(req,res)=>{
        try{
            const response= await Products.find();
            res.json({products:response})
        }
        catch(err){
            console.log("error")
            res.status(400).json({msg:"Bad request"})
        }
    },
    updateproduct:async(req,res)=>{
        try{
            const ProductID= req.query.id
            console.log("hello")
          //res.json({hello:ProductID})
            const vals= await Products.findById(ProductID)

            if(!vals){
                res.json({f:"Not found"})
            }
            else{
                res.json({vals})
            }

        }
        catch(error){
            res.json(error)
        }
    },
    putproduct:async(req,res)=>{
        try{
            const {id,title,price, description,}=req.body;
            const updater= await Products.findByIdAndUpdate(id,{title,price,description},{new:true})
            // if (!updater) {
            //     return res.status(404).json({ message: "Product not found" });
            // }
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.json({ message: "Invalid Product ID" });
            }
            res.status(200).json({messaage:"Update Successful"})
        }
        catch(error){
            res.json({error})
        }
    },
    createproduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content } = req.body;
    
            if (!product_id || !title || !price || !description || !content) {
                return res.status(400).json({ msg: "Missing required fields" });
            }
    
            const newproduct = new Products({ product_id, title, price, description, content });
            await newproduct.save();
    
            res.status(201).json({ msg: "Product created successfully" });
        } catch (error) {
            console.log("Error creating product:", error);
            res.status(500).json({ msg: "Error creating product", error: error.message });
        }   
    },

    deleteproduct: async(req,res)=>{
        try{
            const {id} = req.body;
            const deleter= await Products.findByIdAndDelete(id)
            console.log(id)
            if(deleter){
                res.status(200).json({msg:"Successful deletion"})
            }
            else{
                res.status(404).json({msg:"Unsuccessful deletion"})
            }
        }
        catch(error){
            res.status(500).json({msg:error})
        }
    }
}


module.exports= operations;