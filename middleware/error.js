const winston = require("winston");

module.exports = function (err, req, res, next) {
  const now = new Date();
  const errorWithTimeStamp = { message: err.message, timestamp: now };
  winston.error(errorWithTimeStamp);

  res.status(500).send("Something went wrong.");
};
