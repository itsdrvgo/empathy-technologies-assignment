import { z } from "zod";

export const authCodeSchema = z.object({
    code: z
        .string({
            invalid_type_error: "Authorization Code must be a string",
            required_error: "Authorization Code is required",
        })
        .min(1, "Authorization Code is required"),
});

export const authExchangeResponseSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    access_token: z.string().min(1, "Access Token is required"),
    permissions: z.string().transform((val) => val.split(",")),
});

export const accessTokenSchema = z.object({
    access_token: z.string().min(1, "Access Token is required"),
});

export const igUserSchema = z.object({
    biography: z.string().optional(),
    followers_count: z
        .number()
        .int("Followers count must be an integer")
        .nonnegative("Followers count cannot be negative"),
    follows_count: z
        .number()
        .int("Follows count must be an integer")
        .nonnegative("Follows count cannot be negative"),
    id: z.string().min(1, "User ID is required"),
    media_count: z
        .number()
        .int("Media count must be an integer")
        .nonnegative("Media count cannot be negative")
        .optional(),
    name: z.string().optional(),
    profile_picture_url: z.string().url().optional(),
    username: z
        .string()
        .min(1)
        .regex(/^[a-zA-Z0-9._]+$/),
    website: z.string().url("Invalid Website URL").optional(),
});

export type AuthCode = z.infer<typeof authCodeSchema>;
export type AuthExchangeResponse = z.infer<typeof authExchangeResponseSchema>;
export type AccessToken = z.infer<typeof accessTokenSchema>;
export type IGUser = z.infer<typeof igUserSchema>;
