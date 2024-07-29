import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
    databaseUrl: process.env.DATABASE_URL!,
    emailService: process.env.EMAIL_SERVICE!,
    emailUsername: process.env.EMAIL_USERNAME!,
    emailPassword: process.env.EMAIL_PASSWORD!,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID!,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN!,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER!,
    clientUrl: process.env.CLIENT_URL!,
    origin: process.env.ORIGIN!,
};
