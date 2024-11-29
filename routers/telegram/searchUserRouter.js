const express = require("express");
const searchUsers = require("../controllers/telegram/searchUsers.js");

const router = express.Router();

router.route("t/search").post(searchUsers.searchUser);

module.exports = router;
