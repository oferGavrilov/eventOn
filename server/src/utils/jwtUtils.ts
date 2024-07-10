import jwt from "jsonwebtoken";
import { config } from "./config";

export const generateAuthToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '7d' })
}
