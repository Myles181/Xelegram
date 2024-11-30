const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");


const searchUser = async (req, res) => {
    try {
        const { sessionString, searchQuery } = req.body;
        
        const stringSession = new StringSession(sessionString);
        const client = new TelegramClient(stringSession, 
            process.env.TELEGRAM_APP_ID, 
            process.env.TELEGRAM_APP_HASH
        );

        await client.connect();

        // Search for users
        const results = await client.invoke(
            new Api.contacts.Search({
                q: searchQuery,
                limit: 50
            })
        );

        // Transform results with profile pictures
        const users = await Promise.all(results.users.map(async (user) => {
            let profilePictures = [];
            
            try {
                const photos = await client.invoke(
                    new Api.photos.getUserPhotos({
                        userId: user.id,
                        offset: 0,
                        maxId: 0,
                        limit: 3 // Get up to 3 profile pictures
                    })
                );
                
                profilePictures = photos.photos.map(photo => ({
                    id: photo.id.toString(),
                    fileReference: photo.fileReference.toString('base64'),
                    dcId: photo.dcId
                }));
            } catch (picError) {
                console.log(`No profile pictures for user ${user.id}`);
            }

            return {
                id: user.id.toString(),
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                phone: user.phone || '',
                profilePictures: profilePictures
            };
        }));

        return res.status(200).json({
            message: 'User search successful',
            users: users
        });
    } catch (error) {
        return res.status(400).json({ 
            message: 'User search failed', 
            error: error.message 
        });
    }
};

module.exports = {searchUser};