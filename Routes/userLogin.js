var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// models
var User = require("../model/user");

// /login -> route
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Email or Phone number is missing" });
  } else {
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid Email" });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        existingUser?.password
      );

      if (!isValidPassword) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid Password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { email: existingUser.email, user_id: existingUser?._id },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        .json({ success: true, mgs: "Login successfully", token: token });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
});

module.exports = router;
