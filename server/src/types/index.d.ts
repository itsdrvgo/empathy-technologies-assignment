declare global {
    declare module "express-serve-static-core" {
        interface Request {
            ctx: {
                access_token: string;
            };
        }
    }
}
