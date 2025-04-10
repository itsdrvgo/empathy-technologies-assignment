import { authQueries } from "./auth";
import { commentQueries } from "./comment";
import { mediaQueries } from "./media";
import { replyQueries } from "./reply";

export const queries = {
    auth: authQueries,
    comment: commentQueries,
    media: mediaQueries,
    reply: replyQueries,
};
