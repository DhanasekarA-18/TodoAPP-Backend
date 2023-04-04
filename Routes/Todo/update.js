var express = require('express');
var TodoSchema=require('../../model/todo.js');
var verfifyToken=require('../../Middleware/verifyToken.js');

const router =express.Router();
router.patch('/:id',verfifyToken,async (req, res) => {
    try {
     const { id } = req.params;
      const updatedUser = await TodoSchema.findByIdAndUpdate(id, {completed : true }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({success:false,msg: 'User not found' });
      }
      else{
        return res.status(200).json({success:true, msg: 'updated successfully',updatedUser:{updatedUser} });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false,msg: 'Internal Server error' });
    }
  
});
module.exports=router;