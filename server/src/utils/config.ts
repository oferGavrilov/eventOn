import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
    jwtActivationSecret: process.env.JWT_ACTIVATION_SECRET!,
    jwtActivationExpiresIn: process.env.JWT_ACTIVATION_EXPIRES_IN!,
    databaseUrl: process.env.DATABASE_URL!,
    emailService: process.env.EMAIL_SERVICE!,
    emailHost: process.env.EMAIL_HOST!,
    emailUsername: process.env.EMAIL_USERNAME!,
    emailPassword: process.env.EMAIL_PASSWORD!,
    origin: process.env.ORIGIN!,
};
