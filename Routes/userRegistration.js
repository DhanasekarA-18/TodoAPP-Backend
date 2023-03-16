var express = require("express");
var router = express.Router();
const {check, body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var User = require("../model/user");

// /register -> route here

router.post(
  "/",
  [
    body("email").isEmail().withMessage("Invalid email"),
    check('phoneNumber')
    .matches(/^[0-9]+$/).withMessage('Phone number must only contain numbers')
    .isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long'),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, phoneNumber, password } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
      if (existingUser?.email.toLowerCase()===email.toLowerCase()) {
        return res
          .status(409)
          .json({ success: "false", msg: "Email Id already Exists!" });
          
      } else if (Number(existingUser?.phoneNumber)===Number(phoneNumber)) {
        return res
          .status(409)
          .json({ success: "false", msg: "phone number already Exists!" });
      } else {
        const hashedPassword =await bcrypt.hash(password,10);
        const newUser = new User({ email, phoneNumber,password:hashedPassword });
        console.log(hashedPassword);
        await newUser.save();
        res
          .status(201)
          .json({ success: true, message: "User created Successfully" });
      }
    } catch (e) {
        console.log(e);
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
  }
);
module.exports = router;
