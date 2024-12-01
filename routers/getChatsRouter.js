const express = require("express");
const getChats = require("../controllers/getChatsController.js");

const router = express.Router();

/**
 * @swagger
 * /t/api/chats:
 *   post:
 *     summary: Fetch Telegram chats and users
 *     description: Retrieves a list of Telegram chats and contacts for the user, sorted by recent activity.
 *     tags:
 *       - Chats
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
 *     responses:
 *       200:
 *         description: Successfully retrieved the chat list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chatList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       chatRoomId:
 *                         type: string
 *                         description: Unique identifier for the chat or user.
 *                         example: "123456789"
 *                       username:
 *                         type: string
 *                         description: The username or title of the chat.
 *                         example: "JohnDoe" 
 *                       profileImage:
 *                         type: string
 *                         description: URL of the chat or user's profile image.
 *                         example: "https://example.com/image.jpg"
 *                       type:
 *                         type: string
 *                         description: Type of entity ('User', 'Chat', 'Channel').
 *                         example: "User"
 *                       unreadMessagesCount:
 *                         type: integer
 *                         description: Number of unread messages in the chat (default is 0).
 *                         example: 0
 *                       latestMessage:
 *                         type: object
 *                         description: Details of the most recent message in the chat.
 *                         example: {}
 *                       pinned:
 *                         type: boolean
 *                         description: Indicates if the chat is pinned (default is false).
 *                         example: false
 *       401:
 *         description: No session found. User needs to log in.
 *       500:
 *         description: Failed to fetch Telegram chats.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to fetch Telegram chats"
 *                 details:
 *                   type: string
 *                   description: Detailed error information.
 *                   example: "Session expired."
 */
router.route("/chats").post(getChats.telegramChatsEndpoint);

module.exports = router;
