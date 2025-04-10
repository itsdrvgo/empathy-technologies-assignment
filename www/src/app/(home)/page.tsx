import { GeneralShell } from "@/components/globals/layouts";
import { Feed, ProfilePage } from "@/components/home";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { IG_ACCESS_TOKEN_COOKIE } from "@/config/const";
import { queries } from "@/lib/queries";
import { cookies } from "next/headers";
import { notFound, unauthorized } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
    return (
        <GeneralShell
            classNames={{
                innerWrapper: "md:space-y-10",
            }}
        >
            <Suspense fallback={<ProfileSkeleton />}>
                <ProfileFetch />
            </Suspense>

            <Separator />

            <Suspense fallback={<FeedSkeleton />}>
                <FeedFetch />
            </Suspense>
        </GeneralShell>
    );
}

async function ProfileFetch() {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(IG_ACCESS_TOKEN_COOKIE)?.value;
    if (!accessToken) unauthorized();

    const user = await queries.auth.me(accessToken);
    if (!user) notFound();

    return <ProfilePage user={user} />;
}

async function FeedFetch() {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(IG_ACCESS_TOKEN_COOKIE)?.value;
    if (!accessToken) unauthorized();

    const media = await queries.media.paginate({
        access_token: accessToken,
    });
    if (!media) notFound();

    return <Feed accessToken={accessToken} initialData={media} />;
}

function ProfileSkeleton() {
    return (
        <section className="flex flex-col gap-6 px-4 md:flex-row md:items-center md:gap-20 md:px-10">
            <div className="flex items-center gap-6">
                <Skeleton className="size-24 rounded-full md:size-40" />

                <div className="space-y-2 md:hidden">
                    <div className="space-y-1">
                        <Skeleton className="h-5 w-28 md:h-6 md:w-32" />
                        <Skeleton className="h-3 w-20 md:h-4 md:w-24" />
                    </div>

                    <div className="flex items-center gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-1"
                            >
                                <Skeleton className="h-5 w-6 md:h-6 md:w-8" />
                                <Skeleton className="h-3 w-10 md:h-4 md:w-12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full space-y-3 md:space-y-5">
                <div className="hidden space-y-1 md:block">
                    <Skeleton className="h-5 w-28 md:h-6 md:w-32" />
                    <Skeleton className="h-3 w-20 md:h-4 md:w-24" />
                </div>

                <div className="hidden items-center gap-8 md:flex md:justify-start md:gap-20">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-1"
                        >
                            <Skeleton className="h-5 w-6 md:h-6 md:w-8" />
                            <Skeleton className="h-3 w-10 md:h-4 md:w-12" />
                        </div>
                    ))}
                </div>

                <div className="space-y-1">
                    <Skeleton className="h-3 w-full md:h-4" />
                    <Skeleton className="h-3 w-1/2 md:h-4" />
                </div>
            </div>
        </section>
    );
}

function FeedSkeleton() {
    return (
        <div className="grid grid-cols-3 gap-1">
            {[...Array(14)].map((_, i) => (
                <Skeleton
                    key={i}
                    className="aspect-square w-full animate-pulse rounded-sm md:aspect-[3/4]"
                />
            ))}
        </div>
    );
}
