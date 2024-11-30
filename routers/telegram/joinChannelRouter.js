const express = require("express");
const joinChannels = require("../../controllers/telegram/joinChannels.js");

const router = express.Router();

router.route("/channel/join").post(joinChannels.joinChannel);

module.exports = router;
