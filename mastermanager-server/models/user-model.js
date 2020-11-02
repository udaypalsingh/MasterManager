const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, required: false },
  team: { type: [String], required: false },
});

module.exports = mongoose.model("user", User);
