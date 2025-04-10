import { z } from "zod";

export const igUserSchema = z.object({
    id: z.string(),
    username: z.string(),
    name: z.string().optional(),
    biography: z.string().optional(),
    profile_picture_url: z.string().url().optional(),
    followers_count: z.number().int().nonnegative(),
    follows_count: z.number().int().nonnegative(),
    media_count: z.number().int().nonnegative().optional(),
    website: z.string().url().optional(),
});

export type IGUser = z.infer<typeof igUserSchema>;
