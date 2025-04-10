import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axios } from "../axios";
import { handleClientError } from "../utils";
import { Callback, ResponseData } from "../validations";

export function useAuth() {
    const router = useRouter();

    const useAuthCallback = () => {
        return useMutation({
            mutationFn: async ({ code }: { code: string }) => {
                const { data } = await axios.get<ResponseData<Callback>>(
                    "/auth/callback",
                    { params: { code } }
                );

                if (!data.success) throw new Error(data.longMessage);
                return data;
            },
            onSuccess: () => {
                router.push("/");
            },
            onError: (err) => {
                return handleClientError(err, {
                    duration: 5000,
                });
            },
        });
    };

    return {
        useAuthCallback,
    };
}
