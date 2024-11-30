const express = require("express");
const searchChannels = require("../../controllers/telegram/searchChannels.js");

const router = express.Router();

router.route("/channel/search").post(searchChannels.searchChannels);

module.exports = router;
