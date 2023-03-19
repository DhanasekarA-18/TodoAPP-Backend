var express = require('express');
var app =express();
require('dotenv/config');
var userdbConnection =require('./Config/userdb').Connect();
app.use(express.json());
var userRoute =require('./Routes/user.js')
var todoRouter =require('./Routes/todos.js')

app.get('/',(req,res)=>{
     res.status(200).json({msg:"Server Running Successfully"})
 })
 
 app.use('/api/v1/todo/user',userRoute);
 app.use('/api/v1/todos/',todoRouter)

 app.use('/*',(req,res)=>{
     res.status(404).json({msg:"Route Not Found"});
 })

 app.listen(process.env.Port_No||3000,()=>{
     console.log(`Server listining @ ${process.env.Port_No}`);
 })