import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

export const login = async (req, res) => {
    try {
        const { phoneNumber, phoneCode } = req.body;
        
        // Create a new StringSession for storing credentials
        const stringSession = new StringSession('');
        
        const client = new TelegramClient(stringSession, 
            process.env.TELEGRAM_API_ID, 
            process.env.TELEGRAM_API_HASH, 
            { connectionRetries: 5 }
        );

        await client.start({
            phoneNumber: () => phoneNumber,
            phoneCode: () => phoneCode,
            onError: (err) => {
                console.error('Login Error:', err);
                throw err;
            }
        });

        // Save the session string for future use
        const sessionString = stringSession.save();

        return res.status(200).json({ 
            message: 'Login successful',
            sessionString: sessionString 
        });
    } catch (error) {
        return res.status(400).json({ 
            message: 'Login failed', 
            error: error.message 
        });
    }
};

export const restoreSession = async (req, res) => {
    const { sessionString } = req.body;
    
    const stringSession = new StringSession(sessionString);
    const client = new TelegramClient(stringSession, 
        process.env.TELEGRAM_API_ID, 
        process.env.TELEGRAM_API_HASH
    );

    try {
        await client.connect();
        return res.status(200).json({ message: 'Session restored' });
    } catch (error) {
        return res.status(400).json({ 
            message: 'Session restoration failed', 
            error: error.message 
        });
    }
};