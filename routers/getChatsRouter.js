const express = require("express");
const getChats = require("../controllers/getChatsController.js");

const router = express.Router();

router.route("/chats").post(getChats.telegramChatsEndpoint);

module.exports = router;
