const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const messageChannel = async (req, res) => {
    try {
        const { sessionString, channelUsername, messageText } = req.body;
        
        // Validate input
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
        if (!messageText) {
            return res.status(400).json({ 
                message: 'Message text is required' 
            });
        }
        
        // Recreate client with saved session
        const session = new StringSession(sessionString);
        const client = new TelegramClient(session, 
            Number(process.env.TELEGRAM_APP_ID), 
            process.env.TELEGRAM_APP_HASH,
            { connectionRetries: 5 }
        );

        // Connect to Telegram
        await client.connect();

        // Get the channel entity
        const channel = await client.getEntity(channelUsername);

        // Send message to channel
        await client.sendMessage(channel, { message: messageText });

        return res.status(200).json({
            message: 'Message sent successfully to channel',
            channelUsername: channelUsername
        });
    } catch (error) {
        console.error('Channel message sending error:', error);
        return res.status(400).json({ 
            message: 'Failed to send message to channel', 
            error: error.message 
        });
    }
};

module.exports = { messageChannel };