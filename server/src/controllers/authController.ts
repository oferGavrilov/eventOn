import { Request, Response, NextFunction } from "express";
import { SignupInput } from '../validation/authValidation';
import { signupService } from "../services/authService";

export const signupController = async (
    req: Request<{}, {}, SignupInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const inputData: SignupInput = req.body;
        const result = await signupService(inputData);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
