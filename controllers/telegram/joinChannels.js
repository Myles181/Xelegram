const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");



const joinChannel = async (req, res) => {
    try {
        const { sessionString, groupUsername } = req.body;
        
        const stringSession = new StringSession(sessionString);
        const client = new TelegramClient(stringSession, 
            process.env.TELEGRAM_APP_ID, 
            process.env.TELEGRAM_APP_HASH
        );

        await client.connect();

        // Join group or channel by username
        const result = await client.invoke(
            new Api.channels.JoinChannel({
                channel: groupUsername
            })
        );

        return res.status(200).json({
            message: 'Successfully joined group/channel',
            result: result
        });
    } catch (error) {
        return res.status(400).json({ 
            message: 'Failed to join group/channel', 
            error: error.message 
        });
    }
};

module.exports = {joinChannel};