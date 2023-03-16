var express = require("express");
var router = express.Router();

//Routes
var userRegistration =require('./userRegistration.js') // user Registration validation 
var userLogin=require('./userLogin')

router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "In user router page" });
});

router.use('/register',userRegistration); 
router.use('/login',userLogin);

module.exports = router;
