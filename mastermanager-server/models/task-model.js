const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdByName: { type: String, required: true },
  creationDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  assignedTo: { type: String, required: true },
  assignedToName: { type: String, required: true },
  completeStatus: { type: Boolean, required: true },
  team: { type: String, required: false },
});
module.exports = mongoose.model("task", Task);
