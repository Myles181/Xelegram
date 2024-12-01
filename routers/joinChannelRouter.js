const express = require("express");
const joinChannels = require("../controllers/joinChannels.js");

const router = express.Router();

/**
 * @swagger
 * /t/api/channel/join:
 *   post:
 *     summary: Join a Telegram group or channel
 *     description: Allows an authenticated Telegram user to join a group or channel using the group's username.
 *     tags:
 *       - Channels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionString:
 *                 type: string
 *                 description: The session string for the authenticated Telegram user.
 *                 example: "1q2w3e4r5t6y7u8i9o0p..."
 *               groupUsername:
 *                 type: string
 *                 description: The username or invite link of the Telegram group or channel to join.
 *                 example: "@example_group"
 *     responses:
 *       200:
 *         description: Successfully joined the group or channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Successfully joined group/channel"
 *                 result:
 *                   type: object
 *                   description: Details of the join operation.
 *                   example: { success: true }
 *       400:
 *         description: Failed to join the group or channel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to join group/channel"
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 *                   example: "Session is invalid or group not found."
 */
router.route("/channel/join").post(joinChannels.joinChannel);

module.exports = router;
