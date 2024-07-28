import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";
import AppError from "./errorMiddleware";

interface DecodedToken {
    id: string;
    role: string;
}

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError(401, 'Unauthorized'));
    }

    try {
        const decoded = jwt.verify(token, config.jwtAccessSecret) as DecodedToken;
    } catch (error) {
        
    }
}

export default authMiddleware;
