import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { config } from '../utils/config';
import AppError from '../middlewares/errorMiddleware';
import { LoginInput, SignupInput } from '../validation/authValidation';
import { EmailService } from './emailService';
import logger from '../logger';
import { IUser, Role } from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils';

interface IUserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: Role;
}

export const signupService = async (inputData: SignupInput) => {
    const { email, password, firstName, phone, lastName, role, category } = inputData;

    const isEmailExists = await prisma.user.findUnique({ where: { email } });
    if (isEmailExists) {
        throw new AppError(409, 'User with this email already exists');
    }

    const isPhoneExists = await prisma.user.findUnique({ where: { phone } });
    if (isPhoneExists) {
        throw new AppError(409, 'User with this phone number already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role,
        category: role === 'Supplier' ? category : undefined
    };

    const { activationCode, activationToken } = createActivationToken(user);

    const emailService = new EmailService();
    await emailService.sendMail({
        email,
        subject: 'Activate your account!',
        name: firstName,
        activationCode,
        template: './activation-mail',
    });

    return { activationToken }
};

export const activateUserService = async (activationToken: string, activationCode: string) => {
    const newUser: { user: IUser, activationCode: string } = jwt.verify(activationToken, config.jwtActivationSecret) as { user: IUser, activationCode: string };

    if (newUser.activationCode !== activationCode) {
        throw new AppError(400, 'Invalid activation code');
    }

    const { email, password, firstName, lastName, phone, role, category } = newUser.user;

    const isEmailExists = await prisma.user.findUnique({ where: { email } });
    if (isEmailExists) {
        throw new AppError(409, 'User with this email already exists');
    }

    const isPhoneExists = await prisma.user.findUnique({ where: { phone } });
    if (isPhoneExists) {
        throw new AppError(409, 'User with this phone number already exists');
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            firstName,
            lastName,
            phone,
            role,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
        }
    });

    if (role === 'Supplier' && category) {
        await prisma.supplier.create({
            data: {
                userId: user.id,
                category: category
            }
        });
    }

    logger.info(`User ${email} activated successfully`);

    const accessToken = generateAccessToken(user.id, role);
    const refreshToken = generateRefreshToken(user.id, role);

    return {
        user,
        accessToken,
        refreshToken
    }
};

export const createActivationToken = (user: IUserData): { activationCode: string, activationToken: string } => {
    const activationCode = Math.floor(100000 + Math.random() + 9000).toString();
    const token = jwt.sign({ user, activationCode }, config.jwtActivationSecret, { expiresIn: config.jwtActivationExpiresIn });

    return { activationCode, activationToken: token };
};

// export const loginService = async (inputData: LoginInput) => {
//     const { email, password } = inputData;

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//         throw new AppError(400, 'Incorrect email or password');
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//         throw new AppError(400, 'Incorrect email or password');
//     }

//     const accessToken = generateAccessToken(user.id, user.role);
//     const refreshToken = generateRefreshToken(user.id, user.role);

//     return {
//         user: {
//             id: user.id,
//             email: user.email,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             role: user.role,
//             isVerified: user.isVerified,
//         },
//         accessToken,
//         refreshToken
//     }
// }
