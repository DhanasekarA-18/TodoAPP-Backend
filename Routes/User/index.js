var express = require("express");
var router = express.Router();

//Routes
var userRegistration =require('./registration.js') // user Registration route 
var userLogin=require('./login.js') //user Login route
var userForget =require('./forgetPassword.js');
var resetPassword =require("./resetPassword.js")

router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "In user router page" });
});

router.use('/register',userRegistration); 
router.use('/login',userLogin);
router.use('/forget',userForget);
router.use('/resetPassword',resetPassword);

module.exports = router;
