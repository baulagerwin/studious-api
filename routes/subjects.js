const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { Subject, validate } = require("../models/subject");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: req.user.username });
  if (!user) return res.status(404).send("User not found.");

  const subject = new Subject({
    name: req.body.name,
    belongsTo: user.username,
  });

  const result = await subject.save();
  res.send(result);
});

router.get("/", auth, async (req, res) => {
  const subjects = await Subject.find({ belongsTo: req.user.username }).select({
    _id: 1,
    name: 1,
  });
  res.send(subjects);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).send("Subject not found.");

  res.send(subject);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).send("Subject not found.");

  subject.name = req.body.name;

  const result = await subject.save();
  res.send(result);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).send("Subject not found.");

  const result = await Subject.findByIdAndDelete(req.params.id);
  res.send(result);
});

module.exports = router;
