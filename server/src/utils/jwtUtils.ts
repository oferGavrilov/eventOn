import jwt from "jsonwebtoken";
import { config } from "./config";
import { IUser, Role } from "../models/userModel";

export const generateAccessToken = (userId: string, role: Role) => {
    return jwt.sign({ id: userId, role }, config.jwtAccessSecret, { expiresIn: config.jwtAccessExpiresIn })
}

export const generateRefreshToken = (userId: string, role: Role) => {
    return jwt.sign({ id: userId, role }, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiresIn })
}