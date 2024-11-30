const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");


const initiateCode = async (req, res) => {
    try {
            const { phoneNumber } = req.body;
            
            // Create a new StringSession for storing credentials
            const stringSession = new StringSession('');
            
            const client = new TelegramClient(stringSession,
                process.env.TELEGRAM_APP_ID, 
                process.env.TELEGRAM_APP_HASH, 
                { connectionRetries: 5 }
            );

            await client.connect();
    
            const sendCodeResult = await client.invoke(
                new Api.auth.SendCode({
                  phoneNumber: phoneNumber,
                  apiId: process.env.TELEGRAM_APP_ID,
                  apiHash: process.env.TELEGRAM_APP_HASH,
                  settings: new Api.CodeSettings({
                    allowFlashcall: true,
                    currentNumber: true,
                    allowAppHash: true,
                    allowMissedCall: true,
                    logoutTokens: [Buffer.from("arbitrary data here")],
                  }),
                })
              );
    
            // Store temporary session information
            let response = {
                    phoneNumber: phoneNumber,
                    phoneCodeHash: sendCodeResult.phoneCodeHash,
                    stringSession: stringSession.save()
                };
    
            return res.status(200).json({ 
                message: 'Code sent successfully',
                response: response
            });

        } catch (error) {
            console.error('Code send error:', error);
            return res.status(400).json({ 
                message: 'Failed to send code', 
                error: error.message 
            });
        }
};

const verifyCode = async (req, res) => {
    try {
        const { phoneNumber, phoneCodeHash, stringSession, phoneCode } = req.body;

        if (!phoneNumber || !phoneCodeHash) {
            return res.status(400).json({ message: 'No pending verification' });
        }

        // Recreate the client with the stored session
        const session = new StringSession(stringSession);
        const client = new TelegramClient(session,
            process.env.TELEGRAM_APP_ID,
            process.env.TELEGRAM_APP_HASH,
            { connectionRetries: 5 }
        );

        // Connect and sign in
        await client.connect();
        const result = await client.invoke(
            new Api.auth.SignIn({
              phoneNumber: phoneNumber,
              phoneCodeHash: phoneCodeHash,
              phoneCode: phoneCode,
            })
          );

        // Save the session string for future use
        const finalSessionString = session.save();

        return res.status(200).json({ 
            message: 'Login successful',
            sessionString: finalSessionString 
        });
    } catch (error) {
        console.error('Verification Error:', error);
        return res.status(400).json({ 
            message: 'Verification failed', 
            error: error.message 
        });
    }
};

const restoreSession = async (req, res) => {
    const { sessionString } = req.body;
    
    const stringSession = new StringSession(sessionString);
    const client = new TelegramClient(stringSession, 
        process.env.TELEGRAM_APP_ID, 
        process.env.TELEGRAM_APP_HASH
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


module.exports = {
    initiateCode,
    verifyCode,
    restoreSession
};