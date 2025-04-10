import { GeneralShell } from "@/components/globals/layouts";
import { Icons } from "@/components/icons";
import { PostPage } from "@/components/p";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { IG_ACCESS_TOKEN_COOKIE } from "@/config/const";
import { queries } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, unauthorized } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(IG_ACCESS_TOKEN_COOKIE)?.value;
    if (!accessToken) unauthorized();

    const [user, media] = await Promise.all([
        queries.auth.me(accessToken),
        queries.media.get({
            access_token: accessToken,
            media_id: id,
        }),
    ]);
    if (!user) notFound();
    if (!media) notFound();

    return {
        title: `Post by '${user.username}'`,
        description: media.caption || "Instagram",
        openGraph: {
            title: media.caption || "Instagram",
            description: media.caption || "Instagram",
            images: [
                {
                    url: media.thumbnail_url || media.media_url || "",
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default function Page(props: PageProps) {
    return (
        <GeneralShell>
            <Suspense fallback={<PostSkeleton />}>
                <PostFetch {...props} />
            </Suspense>
        </GeneralShell>
    );
}

async function PostFetch({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(IG_ACCESS_TOKEN_COOKIE)?.value;
    if (!accessToken) unauthorized();

    const [user, media] = await Promise.all([
        queries.auth.me(accessToken),
        queries.media.get({
            access_token: accessToken,
            media_id: id,
        }),
    ]);
    if (!user) notFound();
    if (!media) notFound();

    return <PostPage media={media} user={user} accessToken={accessToken} />;
}

function PostSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-md border md:flex-row">
            <Skeleton className="aspect-square w-full rounded-none md:aspect-[9/16] md:basis-1/2 md:border-r" />

            <div className="flex w-full flex-col md:basis-1/2">
                <div className="flex items-center gap-3 border-b p-4">
                    <Skeleton className="size-8 rounded-full md:size-10" />

                    <div className="space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    <div className="space-y-1">
                        {[...Array(5)].map((_, i, arr) => (
                            <Skeleton
                                key={i}
                                className={cn(
                                    "h-4 w-full",
                                    i === arr.length - 1 && "w-1/2"
                                )}
                            />
                        ))}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-3">
                                <Skeleton className="size-6 rounded-full md:size-8" />

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-1">
                                        <Skeleton className="h-3 w-12 md:h-4 md:w-16" />
                                        <Skeleton className="h-3 w-full md:h-4" />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-3 w-20 md:h-4 md:w-24" />
                                        <Skeleton className="h-3 w-10 md:h-4 md:w-12" />
                                        <Skeleton className="h-3 w-10 md:h-4 md:w-12" />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center">
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 border-t p-4">
                    <button
                        aria-label="Like"
                        className="flex items-center gap-2 text-sm transition-all ease-in-out hover:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        disabled
                    >
                        <Icons.Heart className="size-5" />0
                    </button>

                    <button
                        aria-label="Comment"
                        className="flex items-center gap-2 text-sm transition-all ease-in-out hover:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        disabled
                    >
                        <Icons.MessageCircle className="size-5" />0
                    </button>

                    <button
                        aria-label="Share"
                        className="flex items-center gap-2 text-sm transition-all ease-in-out hover:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        disabled
                    >
                        <Icons.Share2 className="size-5" />
                    </button>
                </div>

                <div className="flex flex-col items-end gap-2 border-t p-4">
                    <div className="flex w-full items-center gap-2">
                        <Textarea
                            className="rounded-none border-none p-0 focus-visible:ring-0"
                            placeholder="Add a comment..."
                            disabled
                        />

                        <button
                            className="text-sm font-semibold text-blue-400 disabled:cursor-not-allowed! disabled:opacity-50"
                            disabled
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
