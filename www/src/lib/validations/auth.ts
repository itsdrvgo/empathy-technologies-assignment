import { z } from "zod";

export const callbackSchema = z.object({
    userId: z
        .string({
            invalid_type_error: "User ID is required",
            required_error: "User ID is required",
        })
        .min(1, "User ID is required"),
    access_token: z
        .string({
            invalid_type_error: "Access Token is required",
            required_error: "Access Token is required",
        })
        .min(1, "Access Token is required"),
    permissions: z
        .string({
            invalid_type_error: "Permissions are required",
            required_error: "Permissions are required",
        })
        .transform((val) => val.split(",")),
});

export type Callback = z.infer<typeof callbackSchema>;
