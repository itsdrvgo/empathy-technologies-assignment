import { axios } from "../axios";
import { IGMedia, ResponseData } from "../validations";

class MediaQuery {
    async paginate({
        access_token,
        after,
    }: {
        access_token: string;
        after?: string;
    }) {
        const { data } = await axios.get<
            ResponseData<{
                data: IGMedia[];
                paging?: {
                    cursors?: {
                        before?: string;
                        after?: string;
                    };
                    next?: string;
                };
            }>
        >("/media", {
            params: { access_token, after },
        });
        if (!data.success) return null;
        return data.data;
    }

    async get({
        media_id,
        access_token,
    }: {
        media_id: string;
        access_token: string;
    }) {
        const { data } = await axios.get<ResponseData<IGMedia>>(
            `/media/${media_id}`,
            {
                params: { access_token },
            }
        );
        if (!data.success) return null;
        return data.data;
    }
}

export const mediaQueries = new MediaQuery();
