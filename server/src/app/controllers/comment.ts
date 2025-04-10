import { AppError, URLBuilder } from "@/lib/helpers";
import { CResponse, handleError } from "@/lib/utils";
import { igCommentSchema, type IGComment } from "@/lib/validations";
import axios from "axios";
import type { Request, Response } from "express";

class CommentController {
    async paginate(req: Request, res: Response) {
        try {
            const { access_token } = req.ctx;
            const { media_id } = req.params;
            const { after } = req.query;
            if (!media_id)
                throw new AppError("Media ID is required", "BAD_REQUEST");

            const fields = Object.keys(igCommentSchema.shape).join(",");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/:media_id/comments")
                .setPathParam("media_id", media_id)
                .addQueryParam("access_token", access_token)
                .addQueryParam("fields", fields)
                .addQueryParam("after", after)
                .build();

            const response = await axios.get<{
                data: IGComment[];
                paging: {
                    cursors: { before: string; after: string };
                    next?: string;
                };
            }>(url, {
                headers: { "Content-Type": "application/json" },
            });

            CResponse({
                res,
                data: response.data,
            });
        } catch (err) {
            handleError(err, res);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const { access_token } = req.ctx;
            const { media_id, comment_id } = req.params;
            if (!media_id)
                throw new AppError("Media ID is required", "BAD_REQUEST");
            if (!comment_id)
                throw new AppError("Comment ID is required", "BAD_REQUEST");

            const fields = Object.keys(
                igCommentSchema.omit({ replies: true }).shape
            ).join(",");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/:comment_id")
                .setPathParam("media_id", media_id)
                .setPathParam("comment_id", comment_id)
                .addQueryParam("access_token", access_token)
                .addQueryParam("fields", fields + `,replies{${fields}}`)
                .build();

            const response = await axios.get<IGComment>(url, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.media.id !== media_id)
                throw new AppError(
                    "This comment does not belong to this media",
                    "BAD_REQUEST"
                );

            CResponse({
                res,
                data: response.data,
            });
        } catch (err) {
            handleError(err, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { access_token } = req.ctx;
            const { media_id } = req.params;
            const text = req.body?.text;

            if (!media_id)
                throw new AppError("Media ID is required", "BAD_REQUEST");
            if (!text) throw new AppError("Text is required", "BAD_REQUEST");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/:media_id/comments")
                .setPathParam("media_id", media_id)
                .addQueryParam("access_token", access_token)
                .addQueryParam("message", text)
                .build();

            const response = await axios.post(url, null, {
                headers: { "Content-Type": "application/json" },
            });

            CResponse({
                res,
                data: response.data,
            });
        } catch (err) {
            handleError(err, res);
        }
    }
}

export const commentController = new CommentController();
