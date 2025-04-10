import { AppError, URLBuilder } from "@/lib/helpers";
import { CResponse, handleError } from "@/lib/utils";
import { igMediaSchema, type IGMedia } from "@/lib/validations";
import axios from "axios";
import type { Request, Response } from "express";

class MediaController {
    async paginate(req: Request, res: Response) {
        try {
            const { access_token } = req.ctx;
            const { after } = req.query;

            const fields = Object.keys(igMediaSchema.shape).join(",");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/me/media")
                .addQueryParam("fields", fields)
                .addQueryParam("access_token", access_token)
                .addQueryParam("after", after)
                .build();

            const response = await axios.get<{
                data: IGMedia[];
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
            const { media_id } = req.params;
            if (!media_id)
                throw new AppError("Media ID is required", "BAD_REQUEST");

            const fields = Object.keys(igMediaSchema.shape).join(",");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/v22.0/:media_id")
                .setPathParam("media_id", media_id)
                .addQueryParam("fields", fields)
                .addQueryParam("access_token", access_token)
                .build();

            const response = await axios.get<IGMedia>(url, {
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

export const mediaController = new MediaController();
