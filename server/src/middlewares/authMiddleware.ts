import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";
import AppError from "./errorMiddleware";
import { Role } from "../models/userModel";
import { generateAccessToken } from "../utils/jwtUtils";
import { setCookie } from "../utils/cookies";

interface DecodedToken {
    id: string;
    role: Role;
}

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError(401, 'You are not logged in! Please log in to get access.'));
    }

    try {
        const decoded = jwt.verify(token, config.jwtAccessSecret) as DecodedToken;
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        // If the access token is expired, check the refresh token
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return next(new AppError(401, 'You are not logged in! Please log in to get access.'));
        }

        try {
            const decodedRefresh = jwt.verify(refreshToken, config.jwtRefreshSecret) as DecodedToken;
            req.userId = decodedRefresh.id;
            req.userRole = decodedRefresh.role;

            // Generate new access token
            const newAccessToken = generateAccessToken(decodedRefresh.id, decodedRefresh.role );
            setCookie(res, 'accessToken', newAccessToken);

            next();
        } catch (error) {
            return next(new AppError(401, 'You are not logged in! Please log in to get access.'));
        }
    }
}

export default authMiddleware;
