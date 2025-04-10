"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useComments, useMedia, useReplies } from "@/lib/react-query";
import { CreateIGComment, createIgCommentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Icons } from "../../icons";

interface PageProps {
    mediaId: string;
    accessToken: string;
    replyTo?: {
        commentId: string;
        username: string;
    };
    onCancelReply?: () => void;
}

export function CommentCreateForm({
    mediaId,
    accessToken,
    replyTo,
    onCancelReply,
}: PageProps) {
    const isReplyMode = !!replyTo;

    const form = useForm<CreateIGComment>({
        resolver: zodResolver(createIgCommentSchema),
        defaultValues: {
            text: "",
        },
    });

    useEffect(() => {
        if (replyTo) {
            form.setValue("text", `@${replyTo.username} `);
        } else {
            form.setValue("text", "");
        }
    }, [replyTo, form]);

    const { usePaginate } = useComments();
    const { useInfinite } = useMedia();
    const { useCreate: useCreateReply } = useReplies();

    const { refetch: refetchComments } = usePaginate({
        media_id: mediaId,
        access_token: accessToken,
    });
    const { refetch: refetchMedia } = useInfinite({
        access_token: accessToken,
    });

    const { useCreate: useCreateComment } = useComments();
    const { mutate: commentMutate, isPending: isCommentPending } =
        useCreateComment({
            media_id: mediaId,
            access_token: accessToken,
        });

    const { mutate: replyMutate, isPending: isReplyPending } = useCreateReply({
        media_id: mediaId,
        comment_id: replyTo?.commentId || "",
        access_token: accessToken,
    });

    const isPending = isCommentPending || isReplyPending;

    const handleSubmit = (values: CreateIGComment) => {
        if (isReplyMode && replyTo) {
            replyMutate(
                { text: values.text },
                {
                    onSuccess: () => {
                        refetchComments();
                        refetchMedia();
                        form.reset();
                        if (onCancelReply) onCancelReply();
                    },
                }
            );
        } else {
            commentMutate(values, {
                onSuccess: () => {
                    refetchComments();
                    refetchMedia();
                    form.reset();
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col items-end gap-2 border-t p-4"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                {isReplyMode && (
                    <div className="flex w-full items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                            Replying to{" "}
                            <span className="font-medium text-foreground">
                                @{replyTo.username}
                            </span>
                        </span>
                        <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={onCancelReply}
                        >
                            <Icons.X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="flex w-full items-center gap-2">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="rounded-none border-none p-0 focus-visible:ring-0"
                                        placeholder={
                                            isReplyMode
                                                ? "Write a reply..."
                                                : "Add a comment..."
                                        }
                                        maxRows={4}
                                        disabled={isPending}
                                        autoFocus={isReplyMode}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <button
                        className="text-sm font-semibold text-blue-400 disabled:cursor-not-allowed! disabled:opacity-50"
                        disabled={!form.formState.isDirty || isPending}
                    >
                        Post
                    </button>
                </div>
            </form>
        </Form>
    );
}
