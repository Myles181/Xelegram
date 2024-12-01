const express = require('express');
const telegramController = require('../controllers/getChannelChats');

const router = express.Router();

/**
 * @swagger
 * /t/api/channel/messages:
 *   post:
 *     summary: Retrieve messages from a Telegram channel
 *     description: Fetches messages from a specified channel using a valid session
 *     tags:
 *       - Telegram
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionString:
 *                 type: string
 *                 description: Active Telegram session string
 *               channelUsername:
 *                 type: string
 *                 description: Username of the channel
 *               limit:
 *                 type: number
 *                 description: Maximum number of messages to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved channel messages
 *       400:
 *         description: Invalid input parameters
 *       500:
 *         description: Server error or Telegram API issue
 */
router.route("/channel/messages").post(telegramController.getChannelMessages);

/**
 * @swagger
 * /t/api/channel/info:
 *   post:
 *     summary: Retrieve information about a Telegram channel
 *     description: Fetches detailed information about a specified channel
 *     tags:
 *       - Telegram
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionString:
 *                 type: string
 *                 description: Active Telegram session string
 *               channelUsername:
 *                 type: string
 *                 description: Username of the channel
 *     responses:
 *       200:
 *         description: Successfully retrieved channel information
 *       400:
 *         description: Invalid input parameters
 *       404:
 *         description: Channel not found
 *       500:
 *         description: Server error or Telegram API issue
 */
router.route("/channel/info").post(telegramController.getChannelInfo);

module.exports = router;