const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const getChannelMessages = async (req, res) => {
    try {
        // Extract parameters from request body
        const { 
            sessionString, 
            channelUsername, 
            messageIds = [], 
            limit = 100,  // Default limit if not specified
            offset = 0    // Optional offset for pagination
        } = req.body;

        // Validate required parameters
        if (!sessionString) {
            return res.status(400).json({ 
                message: 'Session string is required' 
            });
        }
        if (!channelUsername) {
            return res.status(400).json({ 
                message: 'Channel username is required' 
            });
        }

        // Create session and client
        const session = new StringSession(sessionString);
        const client = new TelegramClient(
            session, 
            Number(process.env.TELEGRAM_APP_ID), 
            process.env.TELEGRAM_APP_HASH, 
            { connectionRetries: 5 }
        );

        // Connect to Telegram
        await client.connect();

        // Fetch channel messages
        const result = await client.invoke(
            new Api.channels.GetMessages({
                channel: channelUsername,
                id: messageIds.length > 0 ? messageIds : undefined,
                limit: limit,
                offsetId: offset
            })
        );

        // Process and return messages
        const processedMessages = result.messages.map(message => ({
            id: message.id,
            message: message.message,
            date: message.date,
            // Add more fields as needed
            // Be careful with sensitive information
        }));

        return res.status(200).json({
            message: 'Messages retrieved successfully',
            messages: processedMessages,
            total: processedMessages.length
        });

    } catch (error) {
        console.error('Channel Messages Error:', error);
        return res.status(500).json({ 
            message: 'Failed to retrieve channel messages', 
            error: error.message 
        });
    }
};

// Additional optional endpoints could include:
const getChannelInfo = async (req, res) => {
    try {
        const { sessionString, channelUsername } = req.body;

        // Validate required parameters
        if (!sessionString || !channelUsername) {
            return res.status(400).json({ 
                message: 'Session string and channel username are required' 
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

        // Resolve channel entity
        const channel = await client.getEntity(channelUsername);

        // Return channel information
        return res.status(200).json({
            id: channel.id,
            title: channel.title,
            username: channel.username,
            participantsCount: channel.participantsCount,
            // Add more channel details as needed
        });

    } catch (error) {
        console.error('Channel Info Error:', error);
        return res.status(500).json({ 
            message: 'Failed to retrieve channel information', 
            error: error.message 
        });
    }
};

module.exports = {
    getChannelMessages,
    getChannelInfo
};