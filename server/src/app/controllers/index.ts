import { authController } from "./auth";
import { commentController } from "./comment";
import { mediaController } from "./media";
import { replyController } from "./reply";

export const controller = {
    auth: authController,
    comment: commentController,
    media: mediaController,
    reply: replyController,
};
