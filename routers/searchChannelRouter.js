const express = require("express");
const searchChannels = require("../controllers/searchChannels.js");

const router = express.Router();

/**
 * @swagger
 * /t/api/channel/search:
 *   post:
 *     summary: Search for Telegram channels
 *     description: Allows an authenticated Telegram user to search for channels by a search query.
 *     tags:
 *       - Channels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionString
 *               - searchQuery
 *             properties:
 *               sessionString:
 *                 type: string
 *                 description: The session string for the authenticated Telegram user.
 *                 example: "1q2w3e4r5t6y7u8i9o0p..."
 *               searchQuery:
 *                 type: string
 *                 description: The search query for finding channels (e.g., channel name or keyword).
 *                 example: "tech news"
 *     responses:
 *       200:
 *         description: Channel search successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Channel search successful"
 *                 channels:
 *                   type: array
 *                   description: List of channels found based on the search query.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique ID of the channel.
 *                         example: "123456789"
 *                       title:
 *                         type: string
 *                         description: The title of the channel.
 *                         example: "Tech News"
 *                       username:
 *                         type: string
 *                         description: The username of the channel.
 *                         example: "@technews"
 *                       participants:
 *                         type: integer
 *                         description: The number of participants in the channel.
 *                         example: 1500
 *                       channelPicture:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The ID of the channel's profile picture.
 *                             example: "abc123"
 *                           fileReference:
 *                             type: string
 *                             description: The file reference for the channel's profile picture.
 *                             example: "base64encodedfileReference"
 *                           dcId:
 *                             type: integer
 *                             description: The data center ID where the channel's profile picture is stored.
 *                             example: 2
 *       400:
 *         description: Failed to search for channels
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Channel search failed"
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 *                   example: "Invalid session string or search query."
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
router.route("/channel/search").post(searchChannels.searchChannels);

module.exports = router;
