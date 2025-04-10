"use client";

import { useMedia } from "@/lib/react-query";
import { IGMedia } from "@/lib/validations";
import { useIntersection } from "@mantine/hooks";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Icons } from "../icons";

interface PageProps {
    accessToken: string;
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
}

export function Feed({ initialData, accessToken }: PageProps) {
    const [cursor, setCursor] = useState<string | undefined>(
        initialData?.paging?.cursors?.after
    );

    const { useInfinite } = useMedia();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfinite({
        initialData,
        initialCursor: cursor,
        access_token: accessToken,
    });

    const lastItemRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5,
    });

    useEffect(() => {
        if (
            data?.pages?.length > 0 &&
            data.pages[data.pages.length - 1].paging?.cursors?.after
        ) {
            const newCursor =
                data.pages[data.pages.length - 1].paging?.cursors?.after;
            if (newCursor && newCursor !== cursor) setCursor(newCursor);
        }
    }, [data?.pages, cursor]);

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage)
            fetchNextPage();
    }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        if (lastItemRef.current) ref(lastItemRef.current);
    }, [ref, data]);

    if (isLoading)
        return (
            <div className="flex justify-center p-8">
                <Icons.Loader2 className="animate-spin" />
            </div>
        );

    if (isError)
        return (
            <div className="p-8 text-center text-red-500">
                Error loading feed. Please try again.
            </div>
        );

    const allMedia = data?.pages?.flatMap((page) => page.data) || [];

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 gap-1">
                {allMedia.map((media, index) => (
                    <MediaItem
                        key={media.id}
                        media={media}
                        ref={
                            index === allMedia.length - 1
                                ? lastItemRef
                                : undefined
                        }
                    />
                ))}
            </div>

            {isFetchingNextPage && (
                <div className="flex justify-center p-4">
                    <Loader2 className="animate-spin" />
                </div>
            )}
        </div>
    );
}

const MediaItem = forwardRef<HTMLDivElement, { media: IGMedia }>(
    ({ media }, ref) => {
        const imageUrl = media.thumbnail_url || media.media_url;

        return (
            <div
                ref={ref}
                className="relative aspect-square overflow-hidden md:aspect-[3/4]"
            >
                {imageUrl ? (
                    <Link
                        href={`/p/${media.id}`}
                        className="group"
                        target="_blank"
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src={imageUrl}
                                alt={media.caption || "Instagram media"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, 25vw"
                            />

                            {media.media_type !== "IMAGE" && (
                                <div className="absolute top-2 right-2">
                                    {media.media_type === "VIDEO" ? (
                                        <Icons.Film className="size-5" />
                                    ) : (
                                        <Icons.GalleryHorizontal className="size-5" />
                                    )}
                                </div>
                            )}

                            <div className="absolute inset-0 flex size-full items-center justify-center bg-black/50 opacity-0 transition-all ease-in-out group-hover:opacity-100">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Icons.Heart className="size-5 fill-white" />
                                        <span>{media.like_count || 0}</span>
                                    </div>

                                    <div className="flex items-center gap-2 font-semibold">
                                        <Icons.MessageCircle className="size-5 fill-white" />
                                        <span>{media.comments_count || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        No Image
                    </div>
                )}
            </div>
        );
    }
);

MediaItem.displayName = "MediaItem";
