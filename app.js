var express = require('express');
var app =express();
require('dotenv/config');
var userdbConnection =require('./Config/userdb').Connect();
app.use(express.json());

app.get('/',(req,res)=>{
     res.status(200).json({msg:"server running"})
 })
 
 app.use('/*',(req,res)=>{
     res.status(404).json({msg:"Route Not Found"});
 })
 
 app.listen(process.env.Port_No,()=>{
     console.log(`Server listining @ ${process.env.Port_No}`);
 })