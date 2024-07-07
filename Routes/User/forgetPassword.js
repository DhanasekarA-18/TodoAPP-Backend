var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var User = require("../../model/user.js");

router.post("/", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.({ email });
  if (!existingUser) {
  return res.status(401).json({ success: false, msg: "Email not found!" });
  } else {
    const token = jwt.sign(
      { email: existingUser.email, user_id: existingUser?._id }, //payload
      process.env.JWT_SECRET,
      {
        expiresIn: "60m",
      }
    );
    existingUser.resetToken = token;
    try {
      await existingUser.save();
      if(existingUser.resetToken){
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.nodeMailEmail,
          pass: process.env.nodeMailPwd,
        },
      });
      let mailDetails = {
        from: process.env.nodeMailEmail,
        to: `${email}`,
        subject: "Password Reset Request for Todo App",
        html: ` <p>Hello ${email.split("@")[0] || email}!</p>
                <p>You recently requested to reset your password. Please click the link below to reset your password:</p>
                <a href=${
                  process.env.clientSideUrl
                }/resetPassword?token=${token} target="_blank"><button>Reset Password</button></a>
                <p>This link will expire in 30 minutes.</p>
            <p style=color:red>If you did not request a password reset, please ignore this email.</p>
            <p>Thank You!</p>`,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("error", err);
          res
            .status(500)
            .json({ success: false, error: "Error sending email" });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Email sent successfully" });
        }
      });
    }
    else{
      res.status(401).json({ success: false, msg: `Reset token can't added` });
    }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, msg: `Internal Server Error` });
    }
  }
});
module.exports = router;
