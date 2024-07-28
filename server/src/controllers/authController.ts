import { Request, Response, NextFunction } from "express";
import { SignupInput, VerifyEmailInput } from '../validation/authValidation';
import { signupService, verifyEmailService } from "../services/authService";
import { setCookie } from "../utils/cookies";

export const signupController = async (
    req: Request<{}, {}, SignupInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const inputData: SignupInput = req.body;
        const { user, accessToken, refreshToken } = await signupService(inputData);

        setCookie(res, 'accessToken', accessToken)
        setCookie(res, 'refreshToken', refreshToken)
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

export const verifyEmailController = async (
    req: Request<{}, {}, {}, VerifyEmailInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token }: VerifyEmailInput = req.query;
        const result = await verifyEmailService(token);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}