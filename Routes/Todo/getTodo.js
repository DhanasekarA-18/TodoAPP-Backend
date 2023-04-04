var express = require('express');
const verifyToken = require('../../Middleware/verifyToken');
var TodoSchema=require('../../model/todo.js');
var router =express.Router();
router.get('/',async(req,res)=>{
const decoded =  req.user;
const userId =decoded?.user_id;
const user =  await TodoSchema.find({userId}); 
return res.status(200).json({success:true,data:{user}})
});

module.exports=router;