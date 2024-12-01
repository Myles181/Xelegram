const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { getInputChannel } = require('telegram/Utils');

const getChannelMessages = async (req, res) => {
    try {
        // Extract parameters from request body
        const { 
            sessionString, 
            channelUsername, 
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

        // Resolve the input channel
        const resolvedChannel = await client.invoke(
            new Api.contacts.ResolveUsername({
                username: channelUsername.replace('@', '')
            })
        );

        // Check if channel is found
        if (!resolvedChannel.peer) {
            return res.status(404).json({ 
                message: 'Channel not found' 
            });
        }

        // Fetch channel messages using messages.getHistory
        const result = await client.invoke(
            new Api.messages.GetHistory({
                peer: resolvedChannel.peer,
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

        let channel;
        try {
            // Try resolving the channel by username
            channel = await client.getEntity(channelUsername);
        } catch (resolveError) {
            console.error('Error resolving channel:', resolveError.message);
            return res.status(404).json({ 
                message: `Could not resolve channel: ${channelUsername}`, 
                error: resolveError.message 
            });
        }

        try {
            // Fetch full channel information
            const fullChannel = await client.invoke(
                new Api.channels.GetFullChannel({
                    channel: channel,
                })
            );

            // Return comprehensive channel information
            return res.status(200).json({
                id: channel.id,
                title: channel.title,
                username: channel.username,
                about: fullChannel.fullChat.about,
                participantsCount: fullChannel.fullChat.participantsCount,
                adminCount: fullChannel.fullChat.adminCount,
                accessHash: channel.accessHash,
                photo: {
                    photoId: fullChannel.fullChat.chatPhoto?.photoId,
                    dcId: fullChannel.fullChat.chatPhoto?.dcId,
                },
                restrictions: channel.restrictions,
                defaultBannedRights: channel.defaultBannedRights,
            });
        } catch (infoError) {
            console.error('Error fetching full channel info:', infoError.message);
            return res.status(500).json({ 
                message: 'Failed to fetch full channel information', 
                error: infoError.message 
            });
        }
    } catch (error) {
        console.error('Channel Info Error:', error.message);
        return res.status(500).json({ 
            message: 'An unexpected error occurred', 
            error: error.message 
        });
    }
};


module.exports = {
    getChannelMessages,
    getChannelInfo
};