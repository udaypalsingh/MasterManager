const express = require("express");

const UserCtrl = require("../controllers/user-ctrl");
const TaskCtrl = require("../controllers/task-ctrl");
const TeamCtrl = require("../controllers/team-ctrl");

const router = express.Router();

router.post("/user", UserCtrl.createUser);
router.get("/userByEmail/:email", UserCtrl.getUserByEmail);
router.post("/task", TaskCtrl.createTask);
router.put("/task/status/:id", TaskCtrl.updateTaskCompleteStatus);
router.get("/task/team/:id", TaskCtrl.getTaskByTeam);
router.post("/team", TeamCtrl.createTeam);
router.get("/companies", TeamCtrl.getCompanies);
router.get("/team/:id", TeamCtrl.getTeamById);
router.get("/user/:id", UserCtrl.getUserById);
router.put("/user/team/:id", UserCtrl.updateUserTeam);
router.put("/team/members/:id", TeamCtrl.updateTeamMembers);
router.get("/team/company/:id", TeamCtrl.getTeamsByCompany);

module.exports = router;
