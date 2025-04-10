import { axios } from "../axios";
import { IGComment, ResponseData } from "../validations";

class ReplyQuery {
    async create({
        media_id,
        comment_id,
        access_token,
        text,
    }: {
        media_id: string;
        comment_id: string;
        access_token: string;
        text: string;
    }) {
        const { data } = await axios.post<
            ResponseData<{ id: IGComment["id"] }>
        >(
            `/media/${media_id}/comments/${comment_id}/replies`,
            { text },
            { params: { access_token } }
        );
        if (!data.success) return null;
        return data.data;
    }
}

export const replyQueries = new ReplyQuery();
