import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema<any>) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: 'fail',
                message: error.errors
            });
        }
        next(error);
    }
}

