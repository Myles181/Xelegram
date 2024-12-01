const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram");
const session = require("express-session");

const getTelegramChats = async (sessionString) => {
    try {
        // Initialize the Telegram client
        const client = new TelegramClient(
            new StringSession(sessionString),
            Number(process.env.TELEGRAM_APP_ID),
            process.env.TELEGRAM_APP_HASH,
            { connectionRetries: 5 }
        );

        await client.connect();

        // Fetch dialogs (chats and contacts)
        const dialogsResult = await client.invoke(
            new Api.messages.GetDialogs({
                offsetDate: 0,
                offsetId: 0,
                offsetPeer: new Api.InputPeerEmpty(),
                limit: 20, // Adjust as needed
                hash: 0,
            })
        );

        // Process chats and users
        const processedChats = await Promise.all(dialogsResult.chats.map(async (chat) => {
            let isMember = true;
            let numOfParticipants = 0;

            // Check membership for groups and channels
            if (chat.className === 'Channel' || chat.className === 'Chat') {
                try {
                    const chatFullInfo = await client.invoke(
                        new Api.channels.GetFullChannel({
                            channel: chat
                        })
                    );
                    numOfParticipants = chatFullInfo.fullChat.participantsCount;
                    
                    // Check if the current user is a member
                    try {
                        const result = await client.invoke(
                            new Api.channels.GetParticipant({
                              channel: chat.username,
                              participant: (await client.getMe()).username,
                            })
                          );
                        if (result.users) { isMember = true}
                    } catch {
                        // If getting messages fails, use alternative membership check
                        isMember = false;
                    }
                } catch (error) {
                    isMember = false;
                    let numberParticipants = 0;
                    console.error(`Error checking membership for ${chat.title}:`, error);
                }
            }

            return {
                chatRoomId: chat.id.toString(),
                title: chat.title,
                username: chat.username,
                profileImage: chat.photo?.photo_big,
                type: chat.className,
                numOfParticipants: numOfParticipants,
                isMember: isMember
            };
        }));

        const processedUsers = dialogsResult.users
            .filter(user => user.id !== client.session.userId) // Exclude self
            .map(user => ({
                chatRoomId: user.id.toString(),
                title: `${user.firstName} ${user.lastName}`.trim(),
                username: user.username,
                profileImage: user.photo?.photo_big,
                type: 'User',
                isMember: true // Always true for direct user chats
            }));

        // Combine and deduplicate
        const combinedChats = [
            ...processedChats,
            ...processedUsers
        ];

        // Optional: Sort by most recent message
        combinedChats.sort((a, b) => {
            const getLastMessageTime = (chat) => {
                const dialog = dialogsResult.dialogs.find(d => 
                    d.peer.userId?.toString() === chat.chatRoomId || 
                    d.peer.chatId?.toString() === chat.chatRoomId
                );
                return dialog ? dialog.date : 0;
            };

            return getLastMessageTime(b) - getLastMessageTime(a);
        });

        return combinedChats;
    } catch (error) {
        console.error("Error fetching Telegram chats:", error);
        throw error;
    }
};

// Express endpoint remains the same
const telegramChatsEndpoint = async (req, res) => {
    try {
        const { sessionString } = req.body;

        if (!sessionString) {
            return res.status(401).json({ 
                error: 'No session found. Please log in.' 
            });
        }

        const chats = await getTelegramChats(sessionString);
        
        res.json({
            chatList: chats.map(chat => ({
                chatRoomId: chat.chatRoomId,
                title: chat.title,
                username: chat.username,
                profileImage: chat.profileImage,
                type: chat.type,
                numOfParticipants: chat.numOfParticipants,
                isMember: chat.isMember,
                unreadMessagesCount: 0,
                latestMessage: {},
                pinned: false
            }))
        });
    } catch (error) {
        console.error('Endpoint error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch Telegram chats',
            details: error.message 
        });
    }
};

module.exports = {
    telegramChatsEndpoint,
};