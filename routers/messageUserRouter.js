const express = require("express");
const messageUsers = require("../controllers/messageUsers.js");

const router = express.Router();

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Send a message to a user or chat on Telegram
 *     description: Sends a message to the specified user or chat using the provided session string and message text.
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionString
 *               - destination
 *               - messageText
 *             properties:
 *               sessionString:
 *                 type: string
 *                 description: The session string used to authenticate the user with Telegram.
 *                 example: "1q2w3e4r5t6y7u8i9o0p..."
 *               destination:
 *                 type: string
 *                 description: The username or chat ID of the recipient of the message.
 *                 example: "username_or_chat_id"
 *               messageText:
 *                 type: string
 *                 description: The text content of the message to be sent.
 *                 example: "Hello, how are you?"
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Message sent successfully"
 *                 destination:
 *                   type: string
 *                   description: The recipient's username or chat ID.
 *                   example: "username_or_chat_id"
 *       400:
 *         description: Failed to send the message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to send message"
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 *                   example: "Destination is invalid or message format is incorrect."
 *       401:
 *         description: Unauthorized (session string missing or invalid)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "No session found. Please log in."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "An error occurred while processing your request."
 */
router.route("/message").post(messageUsers.messageUser);

module.exports = router;
