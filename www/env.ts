import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(["development", "production", "test"])
            .default("development"),
    },
    client: {
        NEXT_PUBLIC_BACKEND_URL: z
            .string()
            .url("NEXT_PUBLIC_BACKEND_URL is required"),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,

        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
});
