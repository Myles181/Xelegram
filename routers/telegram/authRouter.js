const express = require("express");
const authController = require("../controllers/telegram/authController");

const router = express.Router();

router.route("t/login").post(authController.login);
router.route("t/refresh").post(authController.restoreSession);

module.exports = router;
