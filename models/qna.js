const { subjectSchema } = require("../models/subject");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema({
  subject: {
    type: subjectSchema,
    required: true,
  },
  question: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 610,
  },
  answer: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 610,
  },
});

const QNA = mongoose.model("QNA", qnaSchema);

function validateQNA(qna) {
  const schema = Joi.object({
    subjectId: Joi.objectId().required(),
    question: Joi.string().min(5).max(610).required(),
    answer: Joi.string().min(5).max(610).required(),
  });

  return schema.validate(qna);
}

module.exports.QNA = QNA;
module.exports.validate = validateQNA;
