const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

const dotenvPath = path.join(__dirname, ".env");
dotenv.config({ path: dotenvPath });


console.log(process.env)
console.log("API_ID:", process.env.TELEGRAM_APP_ID);
console.log("API_HASH:", process.env.TELEGRAM_APP_HASH);

// Set the strictQuery option before connecting to the database
mongoose.set('strictQuery', false);

// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected..."))
  .catch((error) => console.log("An error occured..."));

// Serve client folder
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//   Listen to port
exports.expressServer = app.listen(process.env.PORT || 4000, () =>
  console.log("Listening...")
);
