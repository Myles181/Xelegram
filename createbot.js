// Example script to run once in your project to add the bot to the database
const mongoose = require("mongoose");
const User = require("./models/User"); // Make sure to adjust the path as necessary
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Set the strictQuery option before connecting to the database
mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Check if bot user already exists
    const botExists = await User.findOne({ username: process.env.REACT_APP_BOT_USERNAME });

    if (!botExists) {
      // Insert the bot user
      await User.create({
        name: process.env.REACT_APP_BOT_NAME,
        username: process.env.REACT_APP_BOT_USERNAME,
        password: "YourBotPassword", // Ensure a strong password or hash it if necessary
        confirmPassword: "YourBotPassword", // Ensure a strong password or hash it if necessary
        isBot: true, // Add any additional bot-specific fields you may need
      });

      console.log("Bot added to the database.");
    } else {
      console.log("Bot already exists in the database.");
    }

    mongoose.disconnect();
  })
  .catch(err => console.error("Error connecting to MongoDB:", err));
