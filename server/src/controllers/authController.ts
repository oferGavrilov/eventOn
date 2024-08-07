import { Request, Response, NextFunction } from "express";
import { ActivateUserInput, SignupInput } from '../validation/authValidation';
import { activateUserService, signupService } from "../services/authService";
import { setCookie } from "../utils/cookies";

export const signupController = async (
    req: Request<{}, {}, SignupInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const inputData: SignupInput = req.body;
        const { activationToken } = await signupService(inputData);

        setCookie(res, 'activationToken', activationToken, { maxAge: 300000 })

        res.status(200).json({ message: 'Activation mail sent' });
    } catch (error) {
        next(error);
    }
}

export const activationUserController = async (
    req: Request<{}, {}, ActivateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { activationToken, activationCode } = req.body;
        const { user, accessToken, refreshToken } = await activateUserService(activationToken, activationCode);

        setCookie(res, 'accessToken', accessToken)
        setCookie(res, 'refreshToken', refreshToken)

        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

// export const loginController = async (
//     req: Request<{}, {}, LoginInput>,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const { user, accessToken, refreshToken } = await loginService(req.body);

//         setCookie(res, 'accessToken', accessToken)
//         setCookie(res, 'refreshToken', refreshToken)

//         res.status(200).json({ user });
//     } catch (error) {
//         next(error);
//     }
// }