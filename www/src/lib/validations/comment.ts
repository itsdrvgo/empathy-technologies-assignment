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
            })
        ),
        paging: z.object({
            cursors: z.object({ before: z.string(), after: z.string() }),
            next: z.string().nullish(),
        }),
    }),
});

export const createIgCommentSchema = z.object({
    text: z
        .string({
            invalid_type_error: "Text is required",
            required_error: "Text is required",
        })
        .min(1, "Comment has to be at least 1 character")
        .max(2200, "Comment has to be at most 2200 characters"),
});

export type IGComment = z.infer<typeof igCommentSchema>;
export type CreateIGComment = z.infer<typeof createIgCommentSchema>;
