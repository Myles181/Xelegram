const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/initiate").post(authController.initiateCode);
router.route("/verify").post(authController.verifyCode);
router.route("/refresh").post(authController.restoreSession);

module.exports = router;
