import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET!,
    databaseUrl: process.env.DATABASE_URL!,
    emailService: process.env.EMAIL_SERVICE!,
    emailUsername: process.env.EMAIL_USERNAME!,
    emailPassword: process.env.EMAIL_PASSWORD!,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID!,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN!,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER!,
    clientUrl: process.env.CLIENT_URL!,
};
