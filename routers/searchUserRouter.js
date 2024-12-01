const express = require("express");
const searchUsers = require("../controllers/searchUsers.js");

const router = express.Router();

router.route("/search").post(searchUsers.searchUser);

module.exports = router;
