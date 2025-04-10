"use client";

import { useComments } from "@/lib/react-query";
import { IGComment, IGMedia, IGUser } from "@/lib/validations";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { CommentCreateForm } from "../globals/forms";
import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface PostPageProps {
    media: IGMedia;
    user: IGUser;
    accessToken: string;
}

export function PostPage({ media, user, accessToken }: PostPageProps) {
    const { usePaginate } = useComments();
    const {
        data: commentsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePaginate({
        media_id: media.id,
        access_token: accessToken,
    });

    const [replyTo, setReplyTo] = useState<
        { commentId: string; username: string } | undefined
    >(undefined);

    const allComments = commentsData?.pages.flatMap((page) => page.data) || [];

    const topLevelComments = allComments.filter(
        (comment) => !comment.parent_id
    );

    const imageUrl = media.thumbnail_url || media.media_url;

    return (
        <div className="flex flex-col overflow-hidden rounded-md border md:flex-row">
            <div className="relative aspect-square w-full overflow-hidden md:aspect-[9/16] md:basis-1/2 md:border-r">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={media.caption || "Instagram post"}
                        width={1000}
                        height={1000}
                        className="size-full object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-card">
                        No Image
                    </div>
                )}

                {media.permalink && (
                    <Link
                        href={media.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-100 transition-opacity hover:opacity-100 md:opacity-0"
                    >
                        <Button variant="secondary" size="sm" className="gap-2">
                            <Icons.ExternalLink className="h-4 w-4" />
                            View on Instagram
                        </Button>
                    </Link>
                )}
            </div>

            <div className="flex w-full flex-col md:basis-1/2">
                <div className="flex items-center gap-3 border-b p-4">
                    <Avatar className="size-10">
                        <AvatarImage src={user.profile_picture_url} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="font-semibold">{user.username}</div>
                        <p className="text-xs text-muted-foreground">
                            {media.timestamp &&
                                formatDistanceToNow(new Date(media.timestamp), {
                                    addSuffix: true,
                                })}
                        </p>
                    </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    {media.caption && (
                        <p className="text-sm leading-tight">
                            {media.caption
                                ?.split("\n")
                                .map((line, index, array) => (
                                    <span key={index}>
                                        {line}
                                        {index < array.length - 1 && <br />}
                                    </span>
                                ))}
                        </p>
                    )}

                    <Separator />

                    <div className="space-y-4">
                        {topLevelComments.length > 0 ? (
                            <div className="space-y-4">
                                {topLevelComments.map((comment) => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        allComments={allComments}
                                        onReply={(username) =>
                                            setReplyTo({
                                                commentId: comment.id,
                                                username,
                                            })
                                        }
                                    />
                                ))}

                                {hasNextPage && (
                                    <div className="flex justify-center pt-2">
                                        <button
                                            className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground disabled:cursor-not-allowed! disabled:opacity-50"
                                            onClick={() => fetchNextPage()}
                                            disabled={isFetchingNextPage}
                                        >
                                            {isFetchingNextPage ? (
                                                <>
                                                    <Icons.Loader2 className="size-4 animate-spin" />
                                                    Loading more comments
                                                </>
                                            ) : (
                                                "View more comments"
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-sm text-muted-foreground">
                                No comments yet
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 border-t p-4">
                    <button
                        aria-label="Like"
                        className="flex items-center gap-2 text-sm transition-all ease-in-out hover:text-muted-foreground"
                    >
                        <Icons.Heart className="size-5" />
                        {media.like_count || 0}
                    </button>

                    <button
                        aria-label="Comment"
                        className="flex items-center gap-2 text-sm transition-all ease-in-out hover:text-muted-foreground"
                    >
                        <Icons.MessageCircle className="size-5" />
                        {media.comments_count || 0}
                    </button>

                    <button
                        aria-label="Share"
                        className="flex items-center gap-2 text-sm transition-all ease-in-out hover:text-muted-foreground"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success("Link copied to clipboard");
                        }}
                    >
                        <Icons.Share2 className="size-5" />
                    </button>
                </div>

                <CommentCreateForm
                    accessToken={accessToken}
                    mediaId={media.id}
                    replyTo={replyTo}
                    onCancelReply={() => setReplyTo(undefined)}
                />
            </div>
        </div>
    );
}

function CommentItem({
    comment,
    allComments,
    onReply,
}: {
    comment: IGComment;
    allComments: IGComment[];
    onReply: (username: string) => void;
}) {
    const [showReplies, setShowReplies] = useState(false);

    const replies = allComments.filter((c) => c.parent_id === comment.id);
    const hasReplies = replies.length > 0;

    return (
        <div className="flex gap-3">
            <Avatar className="size-8">
                <AvatarFallback>{comment.from.username[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2 text-sm">
                <div className="space-x-1">
                    <span className="font-semibold">
                        {comment.from.username}
                    </span>
                    <span>{comment.text}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                        {formatDistanceToNow(new Date(comment.timestamp), {
                            addSuffix: true,
                        })}
                    </span>

                    {comment.like_count > 0 && (
                        <span>{comment.like_count} like(s)</span>
                    )}

                    <button
                        className="text-xs hover:text-foreground"
                        onClick={() => onReply(comment.from.username)}
                    >
                        Reply
                    </button>
                </div>

                {hasReplies && (
                    <button
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => setShowReplies(!showReplies)}
                    >
                        <span className="h-px w-8 bg-border" />
                        {showReplies
                            ? "Hide replies"
                            : `View replies (${replies.length})`}
                    </button>
                )}

                {showReplies && hasReplies && (
                    <div className="mt-2 ml-4 space-y-3">
                        {replies.map((reply) => (
                            <div key={reply.id} className="flex gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback>
                                        {reply.from.username[0]}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-1">
                                    <div className="space-x-1">
                                        <span className="font-semibold">
                                            {reply.from.username}
                                        </span>

                                        <span>{reply.text}</span>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span>
                                            {formatDistanceToNow(
                                                new Date(reply.timestamp),
                                                { addSuffix: true }
                                            )}
                                        </span>

                                        {reply.like_count > 0 && (
                                            <span>
                                                {reply.like_count} like(s)
                                            </span>
                                        )}

                                        <button
                                            className="text-xs hover:text-foreground"
                                            onClick={() =>
                                                onReply(reply.from.username)
                                            }
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
