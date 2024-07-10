import twilio from 'twilio';
import { config } from '../utils/config';
import logger from '../logger';
const twilioClient = twilio(config.twilioAccountSid, config.twilioAuthToken);

export const sendSms = async (to: string, message: string) => {
    try {
        await twilioClient.messages.create({
            body: message,
            from: config.twilioPhoneNumber,
            to
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        logger.error(`Error sending SMS to ${to}: ${error}`);
        throw new Error('Error sending SMS');
    }
};

export const sendSmsVerification = async (to: string, verificationCode: string) => {
    const message = `Your verification code is: ${verificationCode}`;
    await sendSms(to, message);
};