const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /t/api/initiate:
 *   post:
 *     summary: Initiate the authentication process
 *     description: Sends a code to the provided phone number for verification.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number to send the code to.
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Code sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Code sent successfully
 *                 response:
 *                   type: object
 *                   properties:
 *                     phoneNumber:
 *                       type: string
 *                     phoneCodeHash:
 *                       type: string
 *                     sessionString:
 *                       type: string
 *       400:
 *         description: Failed to send code.
 */
router.route("/initiate").post(authController.initiateCode);

/**
 * @swagger
 * /t/api/verify:
 *   post:
 *     summary: Verify the authentication code
 *     description: Verifies the code sent to the user's phone number and signs them in.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number associated with the code.
 *                 example: "+1234567890"
 *               phoneCodeHash:
 *                 type: string
 *                 description: The hash received during initiation.
 *               sessionString:
 *                 type: string
 *                 description: The session string from initiation.
 *               phoneCode:
 *                 type: string
 *                 description: The code sent to the phone number.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 userName:
 *                    type: string
 *                 sessionString:
 *                   type: string
 *       400:
 *         description: Verification failed.
 */
router.route("/verify").post(authController.verifyCode);

/**
 * @swagger
 * /t/api/refresh:
 *   post:
 *     summary: Restore the user's session
 *     description: Recreates the user's session using their session string.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionString:
 *                 type: string
 *                 description: The session string to restore.
 *     responses:
 *       200:
 *         description: Session restored successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session restored
 *       400:
 *         description: Session restoration failed.
 */
router.route("/refresh").post(authController.restoreSession);

module.exports = router;
