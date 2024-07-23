import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../prisma';
import { config } from '../utils/config';
import { AppError } from '../middlewares/errorMiddleware';
import { SignupInput } from '../validation/authValidation';
import { sendVerificationEmail } from './emailService';
import logger from '../logger';

export const signupService = async (inputData: SignupInput) => {
    const { email, password, firstName, lastName, role } = inputData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            isVerified: false,
            verificationToken,
        }
    })

    const verificationLink = `${config.clientUrl}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(user.email, verificationLink);

    const token = jwt.sign({
        id: user.id,
        role: user.role,
    }, config.jwtSecret, { expiresIn: '7d' });

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
        token,
    }
};