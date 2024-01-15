const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
      "Please enter a valid email address",
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
