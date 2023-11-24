var express =require('express');
var router=express.Router();

var DailyCalendar = require('../../Controllers/dailyCalendarCron.js');

//routes
var dailyCalendar = require('./dailyCalender.js')

router.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "In webhook router page" });
  });
  
// router.use('/dailyCalendar',dailyCalendar)


    router.use('/dailyCalendar',DailyCalendar)

module.exports=router;