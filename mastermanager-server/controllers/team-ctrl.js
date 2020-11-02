const Team = require("../models/team-model");

getCompanies = async (req, res) => {
  await Team.distinct("company", (err, companies) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!companies.length) {
      return res
        .status(404)
        .json({ success: false, error: `Companies not found` });
    }
    return res.status(200).json({ success: true, data: companies });
  }).catch((err) => console.log(err));
};

getTeamById = async (req, res) => {
  await Team.findOne({ _id: req.params.id }, (err, team) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!team) {
      return res.status(404).json({ success: false, error: `Team not found` });
    }
    return res.status(200).json({ success: true, data: team });
  }).catch((err) => console.log(err));
};

createTeam = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Team",
    });
  }
  const team = new Team(body);
  if (!team) {
    return res.status(400).json({ success: false, error: err });
  }
  team
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: team._id,
        message: "Team created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Team not created!",
      });
    });
};

updateTeamMembers = async (req, res) => {
  const body = req.body;

  Team.updateOne(
    { _id: req.params.id },
    { $addToSet: { members: body.members } },
    (err, team) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: team });
    }
  ).catch((err) => console.log(err));
};

getTeamsByCompany = async (req, res) => {
  await Team.find({ company: req.params.id }, (err, teams) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!teams.length) {
      return res
        .status(404)
        .json({ success: false, error: `Companies not found` });
    }
    return res.status(200).json({ success: true, data: teams });
  }).catch((err) => console.log(err));
};
module.exports = {
  createTeam,
  getCompanies,
  getTeamById,
  updateTeamMembers,
  getTeamsByCompany,
};
