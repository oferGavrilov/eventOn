import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../prisma';
import { config } from '../utils/config';
import AppError from '../middlewares/errorMiddleware';
import { SignupInput } from '../validation/authValidation';
import { sendVerificationEmail } from './emailService';
import logger from '../logger';
import { IUser } from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils';

export const signupService = async (inputData: SignupInput) => {
    const { email, password, firstName, lastName, role } = inputData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError(400, 'User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiresAt = new Date();
    verificationTokenExpiresAt.setHours(verificationTokenExpiresAt.getHours() + 8); // 8 hours from now

    const user: IUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            isVerified: false,
            verificationToken,
            verificationTokenExpiresAt,
        }
    })

    const verificationLink = `${config.clientUrl}/api/auth/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(user.email, verificationLink);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    logger.info(`User ${user.email} signed up successfully`);

    return {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isVerified: user.isVerified,
        },
        accessToken,
        refreshToken
    }
};

export const verifyEmailService = async (token: string) => {
    const user = await prisma.user.findFirst({ where: { verificationToken: token } });

    if (!user) {
        throw new AppError(400, 'Invalid or expired verification token');
    }

    if (user.verificationTokenExpiresAt && user.verificationTokenExpiresAt < new Date()) {
        throw new AppError(400, 'Verification token expired');
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            isVerified: true,
            verificationToken: null,
            verificationTokenExpiresAt: null,
        }
    });

    logger.info(`User ${user.email} verified email successfully`);

    return {
        message: 'Email verified successfully',
    }
};