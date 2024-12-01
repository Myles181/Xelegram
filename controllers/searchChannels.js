const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");


const searchChannels = async (req, res) => {
    try {
        const { sessionString, searchQuery } = req.body;
        
        const session = new StringSession(sessionString);
        const client = new TelegramClient(session, 
            Number(process.env.TELEGRAM_APP_ID), 
            process.env.TELEGRAM_APP_HASH
        );

        await client.connect();

        // Search for channels
        const results = await client.invoke(
            new Api.contacts.Search({
                q: searchQuery,
                limit: 20
            })
        );

        // Filter and transform channels
        const channels = await Promise.all(results.chats
            .filter(chat => chat.className === 'Channel')
            .map(async (channel) => {
                let channelPicture = null;
                
                try {
                    // Get channel photo
                    const photo = await client.invoke(
                        new Api.channels.GetFullChannel({
                            channel: channel.id
                        })
                    );
                    
                    if (photo.fullChat.chatPhoto) {
                        channelPicture = {
                            id: photo.fullChat.chatPhoto.id.toString(),
                            fileReference: photo.fullChat.chatPhoto.fileReference.toString('base64'),
                            dcId: photo.fullChat.chatPhoto.dcId
                        };
                    }
                } catch (picError) {
                    console.log(`No profile picture for channel ${channel.id}`);
                }

                return {
                    id: channel.id.toString(),
                    title: channel.title || '',
                    username: channel.username || '',
                    participants: channel.participantsCount || 0,
                    channelPicture: channelPicture
                };
            })
        );

        return res.status(200).json({
            message: 'Channel search successful',
            channels: channels
        });
    } catch (error) {
        return res.status(400).json({ 
            message: 'Channel search failed', 
            error: error.message 
        });
    }
};

module.exports = {searchChannels};