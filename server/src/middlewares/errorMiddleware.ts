import {Request, Response, NextFunction} from 'express';

export class AppError extends Error {
    constructor(public message:string, public statusCode:number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        status: 'error',
        statusCode: status,
        message: err.message,
    });
};
