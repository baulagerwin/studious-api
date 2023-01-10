const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).send("Bad credentials. Please login again.");

  let isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid)
    return res.status(400).send("Bad credentials. Please login again.");

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["firstName", "lastName", "username", "email"]));
});

function validate(usernameAndPassword) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(55).required(),
    password: Joi.string().min(2).max(55).required(),
  });

  return schema.validate(usernameAndPassword);
}

module.exports = router;
