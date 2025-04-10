import { axios } from "../axios";
import { IGUser, ResponseData } from "../validations";

class AuthQuery {
    async me(access_token: string) {
        const { data } = await axios.get<ResponseData<IGUser>>("/auth/me", {
            params: { access_token },
        });
        if (!data.success) return null;
        return data.data;
    }
}

export const authQueries = new AuthQuery();
