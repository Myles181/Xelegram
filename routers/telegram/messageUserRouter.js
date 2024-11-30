const express = require("express");
const messageUsers = require("../../controllers/telegram/messageUsers.js");

const router = express.Router();

router.route("/message").post(messageUsers.messageUser);

module.exports = router;
