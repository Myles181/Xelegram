const express = require("express");
const searchUsers = require("../../controllers/telegram/searchUsers.js");

const router = express.Router();

router.route("/search").post(searchUsers.searchUser);

module.exports = router;
