import { axios } from "../axios";
import { IGComment, ResponseData } from "../validations";

class CommentQuery {
    async paginate({
        media_id,
        access_token,
        after,
    }: {
        media_id: string;
        access_token: string;
        after?: string;
    }) {
        const { data } = await axios.get<
            ResponseData<{
                data: IGComment[];
                paging?: {
                    cursors?: {
                        before?: string;
                        after?: string;
                    };
                    next?: string;
                };
            }>
        >(`/media/${media_id}/comments`, {
            params: { access_token, after },
        });
        if (!data.success) return null;
        return data.data;
    }

    async create({
        media_id,
        access_token,
        text,
    }: {
        media_id: string;
        access_token: string;
        text: string;
    }) {
        const { data } = await axios.post<
            ResponseData<{ id: IGComment["id"] }>
        >(
            `/media/${media_id}/comments`,
            { text },
            { params: { access_token } }
        );
        if (!data.success) return null;
        return data.data;
    }
}

export const commentQueries = new CommentQuery();
