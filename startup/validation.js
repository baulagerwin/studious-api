const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not set.");
    throw new Error("FATAL ERROR: jwtPrivateKey is not set.");
  }
};
