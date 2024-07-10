import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";
import { AppError } from "./errorMiddleware";

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new AppError('Unauthorized', 401));
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.body.user = decoded;

        next();
    } catch (error) {
        next(new AppError('Unauthorized', 401));
    }
}

export default authMiddleware;
