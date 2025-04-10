import { z } from "zod";

export const igCommentSchema = z.object({
    id: z.string(),
    from: z.object({
        id: z.string(),
        username: z.string(),
    }),
    hidden: z.boolean(),
    like_count: z.number(),
    media: z.object({
        id: z.string(),
    }),
    parent_id: z.string().nullish(),
    text: z.string(),
    timestamp: z.string(),
    replies: z.object({
        data: z.array(
            z.object({
                id: z.string(),
                from: z.object({
                    id: z.string(),
                    username: z.string(),
                }),
                hidden: z.boolean(),
                like_count: z.number(),
                text: z.string(),
                timestamp: z.string(),
            })
        ),
        paging: z.object({
            cursors: z.object({ before: z.string(), after: z.string() }),
            next: z.string().nullish(),
        }),
    }),
});

export type IGComment = z.infer<typeof igCommentSchema>;
