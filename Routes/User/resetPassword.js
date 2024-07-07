var express=require('express');
var router=express.Router();
var bcrypt=require('bcrypt');
var verifyToken=require('../../Middleware/verifyToken.js');
var User =require('../../model/user.js')

const getPayload=(decoded)=>{
  let decodedEmail=decoded.email;
  let decodedUserId=decoded.user_id;
  let expiryTime=decoded.exp;
  let expDate = new Date( expiryTime* 1000); //convert exp time to human readable form
  let tokenDetails={
    decodedEmail,
    decodedUserId,
    expDate
  }
  return tokenDetails;
};

// to verify is active token
router.get('/getTokenDetails',verifyToken,async(req,res)=>{
  let decoded= req.user;
  const payloads= await getPayload(decoded);
  if(payloads){
  res.status(200).json({success:true,msg:payloads});
  }
  else{
    return res.status(401).json({success:false,msg:`Invalid Token`}) 
  }
});


router.post('/',verifyToken,async(req,res)=>{
  let decoded= await req.user;
  const payloads= getPayload(decoded);
  if(payloads){
    let {password}=await req.body;
   const hashedPassword =await bcrypt.hash(password,10);
  const email=decoded?.email;
   const existingUser = await User.findOne({email});
   let passwordStatus = await existingUser.set('password',hashedPassword);
   res.status(200).json({success:true,msg:`Password Updated Successfully`});
  }
  else{
    return res.status(401).json({success:false,msg:`Invalid Token`})
  }
});
module.exports=router;