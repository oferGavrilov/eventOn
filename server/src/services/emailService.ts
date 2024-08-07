import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../utils/config';
import logger from '../logger';
import { renderTemplate } from '../utils/templateHelper';
import { join } from 'path';
import ejs from 'ejs';

type MailOptions = {
    subject: string;
    email: string;
    name: string;
    activationCode: string;
    template: string;
}

export class EmailService {
    private transporter :Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.emailHost,
            secure: true,
            auth: {
                user: config.emailUsername,
                pass: config.emailPassword,
            },
        });
    }

    async sendMail(options: MailOptions) {
        const { subject, email, name, activationCode, template } = options;
        const templatePath = join(__dirname, '../templates', `${template}.ejs`)
        const html = await ejs.renderFile(templatePath, { name, activationCode });


        try {
            await this.transporter.sendMail({
                from: `"EventOn 🎉" <${config.emailUsername}>`,
                to: email,
                subject,
                html,
            });
            
            logger.info(`Email sent to ${email}`);
        } catch (error) {
            logger.error(`Error sending email to ${email}`);
            throw error;
        }
    }
}

