const Task = require("../models/task-model");

createTask = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Task",
    });
  }
  const task = new Task(body);
  if (!task) {
    return res.status(400).json({ success: false, error: err });
  }
  task
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: task._id,
        message: "Task created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Task not created!",
      });
    });
};

getTaskByTeam = async (req, res) => {
  await Task.find({ team: req.params.id }, (err, task) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!task) {
      return res.status(404).json({ success: false, error: `Task not found` });
    }
    return res.status(200).json({ success: true, data: task });
  }).catch((err) => console.log(err));
};

updateTaskCompleteStatus = async (req, res) => {
  const body = req.body;

  Task.updateOne(
    { _id: req.params.id },
    { $set: { completeStatus: body.completeStatus } },
    (err, task) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: task });
    }
  ).catch((err) => console.log(err));
};

module.exports = {
  createTask,
  getTaskByTeam,
  updateTaskCompleteStatus,
};
