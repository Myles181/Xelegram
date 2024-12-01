const express = require("express");
const searchUsers = require("../controllers/searchUsers.js");

const router = express.Router();

/**
 * @swagger
 * /t/api/search:
 *   post:
 *     summary: Search for Telegram users
 *     description: Allows an authenticated Telegram user to search for users based on a query (e.g., first name, last name, username).
 *     tags:
 *       - Users
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
 *                 description: The search query to find users (e.g., first name, last name, or username).
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: User search successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "User search successful"
 *                 users:
 *                   type: array
 *                   description: List of users found based on the search query.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique ID of the user.
 *                         example: "123456789"
 *                       firstName:
 *                         type: string
 *                         description: The first name of the user.
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         description: The last name of the user.
 *                         example: "Doe"
 *                       username:
 *                         type: string
 *                         description: The username of the user.
 *                         example: "@johndoe"
 *                       phone:
 *                         type: string
 *                         description: The phone number of the user.
 *                         example: "+1234567890"
 *                       profilePictures:
 *                         type: array
 *                         description: List of the user's profile pictures.
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: The ID of the profile picture.
 *                               example: "abc123"
 *                             fileReference:
 *                               type: string
 *                               description: The file reference for the profile picture.
 *                               example: "base64encodedfileReference"
 *                             dcId:
 *                               type: integer
 *                               description: The data center ID where the profile picture is stored.
 *                               example: 2
 *       400:
 *         description: Failed to search for users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "User search failed"
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
router.route("/search").post(searchUsers.searchUser);

module.exports = router;
