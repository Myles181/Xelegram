const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const app = require("./app");

const dotenvPath = path.join(__dirname, ".env");
dotenv.config({ path: dotenvPath });


//   Listen to port
exports.expressServer = app.listen(process.env.PORT || 4000, () =>
  console.log("Listening...")
);
