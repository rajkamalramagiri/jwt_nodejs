const mongoose = require("mongoose");

const usreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 222,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 222,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 222,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", usreSchema);
