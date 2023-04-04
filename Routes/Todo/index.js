var express =require('express');
var router=express.Router();
var verifyToken=require('../../Middleware/verifyToken.js');
var create=require('./create.js');
var getTodo=require('./getTodo.js');
var deleteTodo=require('./delete.js');
var updateTodo =require('./update.js');

router.use('/create',create);
router.use('/getTodo',getTodo);
router.use('/deleteTodo/',deleteTodo);
router.use('/update',updateTodo);

module.exports=router;