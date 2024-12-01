const express = require('express');
const telegramController = require('../controllers/telegramController');

const router = express.Router();

/**
 * @swagger
 * /t/api/channel/message:
 *   post:
 *     summary: Send a message to a Telegram channel
 *     description: Sends a message to a specified channel using a valid session
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
 *               messageText:
 *                 type: string
 *                 description: Text of the message to send
 *     responses:
 *       200:
 *         description: Successfully sent message to channel
 *       400:
 *         description: Invalid input parameters or sending failed
 *       500:
 *         description: Server error or Telegram API issue
 */
router.route("/channel/message").post(telegramController.messageChannel);

module.exports = router;