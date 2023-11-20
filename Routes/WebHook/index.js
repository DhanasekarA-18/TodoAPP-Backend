var express =require('express');
var router=express.Router();

//routes
var dailyCalendar = require('./dailyCalender.js')

router.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "In webhook router page" });
  });
  
router.use('/dailyCalendar',dailyCalendar)

module.exports=router;