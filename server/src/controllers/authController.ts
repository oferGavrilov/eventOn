import { Request, Response, NextFunction } from "express";
import { SignupInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../validation/authValidation';

export const signup = async (
    req: Request<{}, {}, SignupInput>,
    res: Response,
    next: NextFunction
) => {
    const inputData: SignupInput = req.body;
    
}