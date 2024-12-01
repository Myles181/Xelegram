const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram");

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
                limit: 100, // Adjust as needed
                hash: 0,
            })
        );

        // Process chats and users
        const processedChats = dialogsResult.chats.map(chat => ({
            chatRoomId: chat.id.toString(),
            username: chat.title || chat.username,
            profileImage: chat.photo?.photo_big || null,
            type: chat.className, // 'Chat', 'Channel', etc.
        }));

        const processedUsers = dialogsResult.users
            .filter(user => user.id !== client.session.userId) // Exclude self
            .map(user => ({
                chatRoomId: user.id.toString(),
                username: user.username || `${user.firstName} ${user.lastName}`.trim(),
                profileImage: user.photo?.photo_big || null,
                type: 'User',
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

// Express endpoint
const telegramChatsEndpoint = async (req, res) => {
    try {
        // Retrieve session from cookies
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
                username: chat.username,
                profileImage: chat.profileImage,
                type: chat.type,
                unreadMessagesCount: 0, // You might want to fetch this separately
                latestMessage: {}, // You can fetch latest message details if needed
                pinned: false // Default unpinned
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
