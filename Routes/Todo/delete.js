var express = require('express');
var TodoSchema=require('../../model/todo.js');
var verfifyToken=require('../../Middleware/verifyToken.js');
const router =express.Router();

router.delete('/:id',verfifyToken,async(req,res)=>{
        try {
          
          const { id } = req.params;
          const deletedTodo = await TodoSchema.findByIdAndDelete(id);
          if (!deletedTodo) {
            return res.status(404).json({status:false,message: 'Todo not found' });
          }
          return res.status(200).json({status:true,message: 'Todo deleted successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
        }
});
module.exports=router;