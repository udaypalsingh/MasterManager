const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Team = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  manager: { type: String, required: false },
  members: { type: [{ type: Object }], required: false },
});
module.exports = mongoose.model("team", Team);
