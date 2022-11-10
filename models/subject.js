const Joi = require("joi");
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

function validateSubject(subject) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(subject);
}

module.exports.subjectSchema = subjectSchema;
module.exports.Subject = Subject;
module.exports.validate = validateSubject;
