import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queries } from "../queries";
import { IGMedia } from "../validations";

export function useMedia() {
    const useInfinite = ({
        access_token,
        initialCursor,
        initialData,
    }: {
        initialData?: {
            data: IGMedia[];
            paging?: {
                cursors?: {
                    before?: string;
                    after?: string;
                };
                next?: string;
            };
        };
        initialCursor?: string;
        access_token: string;
    }) => {
        return useInfiniteQuery({
            queryKey: ["feed", access_token],
            queryFn: async ({ pageParam }) => {
                const data = await queries.media.paginate({
                    access_token,
                    after: pageParam as string,
                });
                if (!data) throw new Error("Failed to fetch feed");
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
            enabled: !!access_token,
        });
    };

    const useGet = ({
        media_id,
        access_token,
        initialData,
    }: {
        media_id: string;
        access_token: string;
        initialData?: IGMedia;
    }) => {
        return useQuery({
            queryKey: ["media", media_id, access_token],
            queryFn: async () => {
                const data = await queries.media.get({
                    media_id,
                    access_token,
                });
                if (!data) throw new Error("Failed to fetch media");
                return data;
            },
            initialData,
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            enabled: !!access_token && !!media_id,
        });
    };

    return {
        useInfinite,
        useGet,
    };
}
