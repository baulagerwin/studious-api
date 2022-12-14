const express = require("express");
const app = express();

require("./startup/prod")(app);
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
