const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("Username already exist.");

  user = new User(
    _.pick(req.body, ["firstName", "lastName", "username", "email", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["firstName", "lastName", "username", "email"]));
});

module.exports = router;
