import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        FRONTEND_URL: z.string().min(1, "FRONTEND_URL is required"),
        PORT: z.coerce.number().default(3001),

        INSTAGRAM_CLIENT_ID: z
            .string()
            .min(1, "INSTAGRAM_CLIENT_ID is required"),
        INSTAGRAM_CLIENT_SECRET: z
            .string()
            .min(1, "INSTAGRAM_CLIENT_SECRET is required"),
        INSTAGRAM_REDIRECT_URI: z
            .string()
            .min(1, "INSTAGRAM_REDIRECT_URI is required")
            .url("Invalid URL"),

        DOMAIN: z.string().min(1, "DOMAIN is required"),
    },
    runtimeEnv: process.env,
});
