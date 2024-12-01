const express = require('express');
const telegramController = require('../controllers/getUserChatsController');

const router = express.Router();

/**
 * @swagger
 * /t/api/user/messages:
 *   post:
 *     summary: Retrieve messages from a Telegram user
 *     description: Fetches message history with a specified user using a valid session
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
 *               userUsername:
 *                 type: string
 *                 description: Username of the user
 *               limit:
 *                 type: number
 *                 description: Maximum number of messages to retrieve
 *               offset:
 *                 type: number
 *                 description: Offset for pagination
 *     responses:
 *       200:
 *         description: Successfully retrieved user messages
 *       400:
 *         description: Invalid input parameters
 *       500:
 *         description: Server error or Telegram API issue
 */
router.route("/user/messages").post(telegramController.getUserMessages);

/**
 * @swagger
 * /t/api/user/info:
 *   post:
 *     summary: Retrieve information about a Telegram user
 *     description: Fetches detailed information about a specified user
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
 *               userUsername:
 *                 type: string
 *                 description: Username of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *       400:
 *         description: Invalid input parameters
 *       500:
 *         description: Server error or Telegram API issue
 */
router.route("/user/info").post(telegramController.getUserInfo);

module.exports = router;