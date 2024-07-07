var express = require('express')
var TodoSchema = require('../../model/todo.js')
var verfifyToken = require('../../Middleware/verifyToken.js')

const router = express.Router()

router.post('/', verfifyToken, async (req, res) => {
  const { title, description, completed, dueDate } = req.body
  console.log(title, description, completed, dueDate)
  const decoded = await req.user
  let { user_id } = decoded
  if (decoded) {
    const newTodoList = new TodoSchema({
      title,
      description,
      completed,
      dueDate,
      user: user_id,
    })
    try {
      await newTodoList.save()
      return res
        .status(200)
        .json({ success: true, msg: `List saved successfully` })
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: `Internal servor error` })
    }
  } else {
    return res
      .status(401)
      .json({ success: false, msg: `decoded details not found` })
  }
})
module.exports = router
