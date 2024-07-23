import nodemailer from 'nodemailer';
import { config } from '../utils/config';
import logger from '../logger';
import { renderTemplate } from '../utils/templateHelper';

const transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
        user: config.emailUsername,
        pass: config.emailPassword,
    },
});

export const sendEmail = async (to: string, subject: string, text: string, html: string): Promise<void> => {
    const mailOptions = {
        from: config.emailUsername,
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        logger.error(`Error sending email to ${to}:`, error);
        throw new Error('Error sending email');
    }
};

export const sendResetPasswordEmail = async (to: string, resetLink: string) => {
    const subject = 'Password Reset';
    const text = `You requested a password reset. Please use the following link to reset your password: ${resetLink}`;
    const html = renderTemplate('resetPassword', { resetLink });

    await sendEmail(to, subject, text, html);
};

export const sendVerificationEmail = async (to: string, verificationLink: string) => {
    const subject = 'Email Verification';
    const text = `Please verify your email by clicking the following link: ${verificationLink}`;
    const html = renderTemplate('verifyEmail', { verificationLink });

    await sendEmail(to, subject, text, html);
};