const express = require("express");
const subjects = require("../routes/subjects");
const qnas = require("../routes/qnas");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/subjects", subjects);
  app.use("/api/qnas", qnas);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
