import { AppError, URLBuilder } from "@/lib/helpers";
import { CResponse, handleError } from "@/lib/utils";
import axios from "axios";
import type { Request, Response } from "express";

class ReplyControler {
    async get(req: Request, res: Response) {
        try {
            const { access_token } = req.ctx;
            const { comment_id } = req.params;
            if (!comment_id)
                throw new AppError("Comment ID is required", "BAD_REQUEST");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/:comment_id/replies")
                .setPathParam("comment_id", comment_id)
                .addQueryParam("access_token", access_token)
                .build();

            const response = await axios.get(url, {
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

    async create(req: Request, res: Response) {
        try {
            const { access_token } = req.ctx;
            const { comment_id } = req.params;
            const text = req.body?.text;

            if (!comment_id)
                throw new AppError("Comment ID is required", "BAD_REQUEST");
            if (!text) throw new AppError("Text is required", "BAD_REQUEST");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/:comment_id/replies")
                .setPathParam("comment_id", comment_id)
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

export const replyController = new ReplyControler();
