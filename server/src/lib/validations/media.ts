import { z } from "zod";

export const igMediaSchema = z.object({
    id: z.string().min(1, "Media ID is required"),
    caption: z.string().optional(),
    comments_count: z
        .number()
        .int("Comments count must be an integer")
        .nonnegative("Comments count cannot be negative"),
    is_comment_enabled: z.boolean().optional(),
    is_shared_to_feed: z.boolean().optional(),
    like_count: z
        .number()
        .int("Like count must be an integer")
        .nonnegative("Like count cannot be negative"),
    media_type: z.enum(["CAROUSEL_ALBUM", "IMAGE", "VIDEO"]),
    media_url: z.string().url("Invalid Media URL").optional(),
    permalink: z.string().url("Invalid Permalink").optional(),
    thumbnail_url: z.string().url("Invalid Thumbnail URL").optional(),
    timestamp: z.string().optional(),
    username: z.string().optional(),
});

export type IGMedia = z.infer<typeof igMediaSchema>;
