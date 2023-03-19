var express =require('express');
var router=express.Router();
var verifyToken=require('../Middleware/verifyToken.js')

router.get('/',verifyToken,(req,res)=>{
    let decodedEmail=req?.user?.email; // email
    let decodedId=req?.user?.user_id; // mongoose unique id
    console.log(`Welcome ${decodedEmail}`);
    res.status(200).json({success:true,mgs:"autheticated",payload:{decodedEmail,decodedId}})
})



module.exports=router;