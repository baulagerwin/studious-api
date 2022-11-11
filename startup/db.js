const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/studious")
    .then(() => console.log("Connected to Mongo DB..."));
};
