const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const getUserMessages = async (req, res) => {
    let client;
    try {
        // Extract parameters from request body
        const { 
            sessionString, 
            userUsername, 
            limit = 100,  // Default limit if not specified
            offset = 0    // Optional offset for pagination
        } = req.body;

        // Validate required parameters
        if (!sessionString) {
            return res.status(400).json({ 
                message: 'Session string is required' 
            });
        }
        if (!userUsername) {
            return res.status(400).json({ 
                message: 'User username is required' 
            });
        }

        // Create session and client
        const session = new StringSession(sessionString);
        client = new TelegramClient(
            session, 
            Number(process.env.TELEGRAM_APP_ID), 
            process.env.TELEGRAM_APP_HASH, 
            { connectionRetries: 5 }
        );

        // Connect to Telegram
        await client.connect();

        // Resolve the user using contacts.ResolveUsername
        const resolvedUser = await client.invoke(
            new Api.contacts.ResolveUsername({
                username: userUsername.replace('@', '')
            })
        );

        // Check if user is found
        if (!resolvedUser.peer) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Fetch user messages using messages.GetHistory
        const result = await client.invoke(
            new Api.messages.GetHistory({
                peer: resolvedUser.peer,
                offsetId: 0,
                addOffset: offset,
                limit: limit,
                maxId: 0,
                minId: 0,
                hash: BigInt(0)
            })
        );

        // Process and return messages
        const processedMessages = result.messages.map(message => ({
            id: message.id,
            message: message.message,
            date: message.date,
            fromId: message.fromId,
            peerId: message.peerId,
            // Add more fields as needed
            // Be careful with sensitive information
        }));

        return res.status(200).json({
            message: 'User messages retrieved successfully',
            messages: processedMessages,
            total: processedMessages.length
        });

    } catch (error) {
        console.error('User Messages Error:', error);
        return res.status(500).json({ 
            message: 'Failed to retrieve user messages', 
            error: error.message 
        });
    } finally {
        // Ensure client disconnection
        if (client) {
            await client.disconnect();
        }
    }
};

const getUserInfo = async (req, res) => {
    try {
        const { sessionString, userUsername } = req.body;

        // Validate required parameters
        if (!sessionString || !userUsername) {
            return res.status(400).json({ 
                message: 'Session string and user username are required' 
            });
        }

        const session = new StringSession(sessionString);
        const client = new TelegramClient(
            session, 
            Number(process.env.TELEGRAM_APP_ID), 
            process.env.TELEGRAM_APP_HASH, 
            { connectionRetries: 5 }
        );

        await client.connect();

        // Resolve user entity
        const user = await client.getEntity(userUsername);

        // Get full user information
        const fullUser = await client.invoke(
            new Api.users.GetFullUser({
                id: user
            })
        );

        // Return user information
        return res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
            isBot: user.bot,
            bio: fullUser.fullUser.about,
            commonChatsCount: fullUser.fullUser.commonChatsCount,
            // Additional user details
            profilePhoto: fullUser.fullUser.profilePhoto ? {
                photoId: fullUser.fullUser.profilePhoto.photoId,
                dcId: fullUser.fullUser.profilePhoto.dcId
            } : null
        });

    } catch (error) {
        console.error('User Info Error:', error);
        return res.status(500).json({ 
            message: 'Failed to retrieve user information', 
            error: error.message 
        });
    }
};

module.exports = {
    getUserMessages,
    getUserInfo
};