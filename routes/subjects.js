const validateObjectId = require("../middleware/validateObjectId");
const { Subject, validate } = require("../models/subject");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = new Subject({
    name: req.body.name,
  });

  const result = await subject.save();
  res.send(result);
});

router.get("/", async (req, res) => {
  const subjects = await Subject.find().sort({ name: 1 });
  res.send(subjects);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).send("Subject not found.");

  res.send(subject);
});

router.put("/:id", validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).send("Subject not found.");

  subject.name = req.body.name;

  const result = await subject.save();
  res.send(result);
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).send("Subject not found.");

  const result = await Subject.findByIdAndDelete(req.params.id);
  res.send(result);
});

module.exports = router;
