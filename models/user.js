const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 55,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 55,
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 55,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 55,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ email: this.email }, config.get("jwtPrivateKey"));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(55).required(),
    lastName: Joi.string().min(2).max(55).required(),
    username: Joi.string().min(2).max(55).required(),
    email: Joi.string().min(2).max(55).email().required(),
    password: Joi.string().min(2).max(55).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;