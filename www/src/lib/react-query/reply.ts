import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queries } from "../queries";
import { handleClientError } from "../utils";

export function useReplies() {
    const router = useRouter();

    const useCreate = ({
        media_id,
        comment_id,
        access_token,
    }: {
        media_id: string;
        comment_id: string;
        access_token: string;
    }) => {
        return useMutation({
            mutationFn: async ({ text }: { text: string }) => {
                const data = await queries.reply.create({
                    media_id,
                    comment_id,
                    access_token,
                    text,
                });
                if (!data) throw new Error("Failed to create reply");
                return data;
            },
            onSuccess: () => {
                router.refresh();
            },
            onError: (err) => {
                return handleClientError(err);
            },
        });
    };

    return {
        useCreate,
    };
}
