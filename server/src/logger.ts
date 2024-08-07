import { createLogger, transports, format } from 'winston';
import { Request, Response, NextFunction } from 'express';
const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'eventOn-service' },
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ level, message }) => `${level}: ${message}`)
            ),
        }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Middleware for logging requests
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

// Custom error handler to log errors
export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, { metadata: { method: req.method, url: req.url, stack: err.stack } });
    next(err);
};

export default logger;
