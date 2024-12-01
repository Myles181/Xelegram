const express = require("express");
const joinChannels = require("../controllers/joinChannels.js");

const router = express.Router();

router.route("/channel/join").post(joinChannels.joinChannel);

module.exports = router;