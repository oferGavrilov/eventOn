import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../middlewares/errorMiddleware";

export const validateRequest = (schema: ZodSchema<any>) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err: any) {
        next(new AppError(err.errors.map((error: any) => error.message).join(', '), 400));
    }
}