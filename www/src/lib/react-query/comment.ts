import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { queries } from "../queries";
import { handleClientError } from "../utils";
import { IGComment } from "../validations";

export function useComments() {
    const router = useRouter();

    const usePaginate = ({
        media_id,
        access_token,
        initialCursor,
        initialData,
    }: {
        media_id: string;
        access_token: string;
        initialCursor?: string;
        initialData?: {
            data: IGComment[];
            paging?: {
                cursors?: {
                    before?: string;
                    after?: string;
                };
                next?: string;
            };
        };
    }) => {
        return useInfiniteQuery({
            queryKey: ["comments", media_id, access_token],
            queryFn: async ({ pageParam }) => {
                const data = await queries.comment.paginate({
                    media_id,
                    access_token,
                    after: pageParam as string,
                });
                if (!data) throw new Error("Failed to fetch comments");
                return data;
            },
            initialData: initialData
                ? {
                      pages: [initialData],
                      pageParams: [initialCursor || null],
                  }
                : undefined,
            initialPageParam: null,
            getNextPageParam: (lastPage) => {
                return lastPage.paging?.cursors?.after || null;
            },
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            enabled: !!access_token && !!media_id,
        });
    };

    const useCreate = ({
        media_id,
        access_token,
    }: {
        media_id: string;
        access_token: string;
    }) => {
        return useMutation({
            mutationFn: async ({ text }: { text: string }) => {
                const data = await queries.comment.create({
                    media_id,
                    access_token,
                    text,
                });
                if (!data) throw new Error("Failed to create comment");
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
        usePaginate,
        useCreate,
    };
}
