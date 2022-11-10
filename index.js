const express = require("express");
const mongoose = require("mongoose");
const subjects = require("./routes/subjects");
const qnas = require("./routes/qnas");
const app = express();

mongoose
  .connect("mongodb://localhost/studious")
  .then(() => console.log("Connected to Mongo DB"))
  .catch((ex) => console.error("Could not connect to Mongo DB", ex.message));

app.use(express.json());
app.use("/api/subjects", subjects);
app.use("/api/qnas", qnas);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
