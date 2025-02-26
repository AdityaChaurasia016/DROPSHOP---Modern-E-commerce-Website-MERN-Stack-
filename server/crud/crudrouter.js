const express=require( 'express')
const router= express.Router()
const operations=require('./operations')


router.route('/productss')
.get(operations.getProd)

router.route('/productupdate')
.get(operations.updateproduct)
.put(operations.putproduct)

router.route('/productcreate')
.post(operations.createproduct)

router.route('/productdelete')
.delete(operations.deleteproduct)




module.exports=router