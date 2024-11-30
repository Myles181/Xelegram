const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");


const messageUser = async (req, res) => {
    try {
        const { sessionString, destination, messageText } = req.body;
        
        // Recreate client with saved session
        const stringSession = new StringSession(sessionString);
        const client = new TelegramClient(stringSession, 
            process.env.TELEGRAM_APP_ID, 
            process.env.TELEGRAM_APP_HASH
        );

        // Connect to Telegram
        await client.connect();

        // Message
        await client.sendMessage(destination, { message: messageText });

        return res.status(200).json({
            message: 'Message sent successfully',
            destination: destination
        });
    } catch (error) {
        console.error('Message sending error:', error);
        return res.status(400).json({ 
            message: 'Failed to send message', 
            error: error.message 
        });
    }
};

module.exports = {messageUser};