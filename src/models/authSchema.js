const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  accessHash: {
    type: String,
  },
  userId: {
    type: String
  },
  token: {
    type: String
  },
  phone: {
    type: String
  }
  
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
