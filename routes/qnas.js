const validateObjectId = require("../middleware/validateObjectId");
const { Subject } = require("../models/subject");
const { QNA, validate } = require("../models/qna");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(404).send("Subject not found.");

  const qna = new QNA({
    subject: {
      name: subject.name,
    },
    question: req.body.question,
    answer: req.body.answer,
  });

  const result = await qna.save();
  res.send(result);
});

router.get("/", async (req, res) => {
  const qnas = await QNA.find().sort("-_id");
  res.send(qnas);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const qna = await QNA.findById(req.params.id);
  if (!qna) return res.status(404).send("QNA not found.");

  res.send(qna);
});

router.put("/:id", validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const qna = await QNA.findById(req.params.id);
  if (!qna) return res.status(404).send("QNA not found.");

  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(404).send("Subject not found.");

  qna.set({
    subject: {
      name: subject.name,
    },
    question: req.body.question,
    answer: req.body.answer,
  });

  const result = await qna.save();
  res.send(result);
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const qna = await QNA.findById(req.params.id);
  if (!qna) return res.status(404).send("QNA not found.");

  const result = await QNA.findByIdAndDelete(req.params.id);
  res.send(result);
});

module.exports = router;
