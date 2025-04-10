import { handleError } from "@/lib/utils";
import { accessTokenSchema } from "@/lib/validations";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { access_token } = accessTokenSchema.parse(req.query);
        req.ctx = { access_token };
        next();
    } catch (err) {
        handleError(err, res);
    }
};
