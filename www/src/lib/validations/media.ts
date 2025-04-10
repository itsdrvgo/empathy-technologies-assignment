import { z } from "zod";

export const igMediaSchema = z.object({
    id: z.string(),
    caption: z.string().optional(),
    comments_count: z.number().int().nonnegative(),
    is_comment_enabled: z.boolean().optional(),
    is_shared_to_feed: z.boolean().optional(),
    like_count: z.number().int().nonnegative(),
    media_type: z.enum(["CAROUSEL_ALBUM", "IMAGE", "VIDEO"]),
    media_url: z.string().url().optional(),
    permalink: z.string().url(),
    thumbnail_url: z.string().url().optional(),
    timestamp: z.string().optional(),
    username: z.string().optional(),
});

export type IGMedia = z.infer<typeof igMediaSchema>;
