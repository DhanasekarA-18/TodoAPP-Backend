const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken:{
    type: String,
    default:null
  }
});
module.exports = mongoose.model("User", UserSchema);
