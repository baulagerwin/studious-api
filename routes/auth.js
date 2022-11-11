const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email.");

  let isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) return res.status(400).send("Invalid password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(emailAndPassword) {
  const schema = Joi.object({
    email: Joi.string().min(2).max(55).email().required(),
    password: Joi.string().min(2).max(55).required(),
  });

  return schema.validate(emailAndPassword);
}

module.exports = router;
