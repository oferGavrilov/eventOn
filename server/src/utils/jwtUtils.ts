import jwt from "jsonwebtoken";
import { config } from "./config";
import { IUser } from "../models/userModel";

export const generateAccessToken = (user: IUser) => {
    return jwt.sign({ id: user.id, role: user.role }, config.jwtAccessSecret, { expiresIn: config.jwtAccessExpiresIn })
}

export const generateRefreshToken = (user: IUser) => {
    return jwt.sign({ id: user.id, role: user.role }, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiresIn })
}