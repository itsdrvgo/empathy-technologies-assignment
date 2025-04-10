"use client";

import { cn } from "@/lib/utils";
import { IGUser } from "@/lib/validations";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface PageProps extends GenericProps {
    user: IGUser;
}

export function ProfilePage({ className, user, ...props }: PageProps) {
    return (
        <section
            className={cn(
                "flex flex-col gap-6 px-4 md:flex-row md:items-center md:gap-20 md:px-10",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-6">
                <Avatar className="size-24 md:size-40">
                    <AvatarImage src={user.profile_picture_url} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>

                <div className="space-y-2 md:hidden">
                    <div>
                        <h2 className="text-lg md:text-xl">{user.name}</h2>
                        <p className="text-xs text-muted-foreground md:text-sm">
                            @{user.username}
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-8 md:justify-start md:gap-20">
                        <div className="flex flex-col items-center">
                            <span className="text-base font-semibold md:text-lg">
                                {user.media_count}
                            </span>
                            <span className="text-xs text-muted-foreground md:text-sm">
                                Posts
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-base font-semibold md:text-lg">
                                {user.followers_count}
                            </span>
                            <span className="text-xs text-muted-foreground md:text-sm">
                                Followers
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-base font-semibold md:text-lg">
                                {user.follows_count}
                            </span>
                            <span className="text-xs text-muted-foreground md:text-sm">
                                Following
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full space-y-3 md:space-y-5">
                <div className="hidden md:block">
                    <h2 className="text-lg md:text-xl">{user.name}</h2>
                    <p className="text-xs text-muted-foreground md:text-sm">
                        @{user.username}
                    </p>
                </div>

                <div className="hidden items-center justify-center gap-8 md:flex md:justify-start md:gap-20">
                    <div className="flex flex-col items-center">
                        <span className="text-base font-semibold md:text-lg">
                            {user.media_count}
                        </span>
                        <span className="text-xs text-muted-foreground md:text-sm">
                            Posts
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-base font-semibold md:text-lg">
                            {user.followers_count}
                        </span>
                        <span className="text-xs text-muted-foreground md:text-sm">
                            Followers
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-base font-semibold md:text-lg">
                            {user.follows_count}
                        </span>
                        <span className="text-xs text-muted-foreground md:text-sm">
                            Following
                        </span>
                    </div>
                </div>

                {!!user.biography && (
                    <p className="text-sm">
                        {user.biography
                            ?.split("\n")
                            .map((line, index, array) => (
                                <span key={index}>
                                    {line}
                                    {index < array.length - 1 && <br />}
                                </span>
                            ))}
                    </p>
                )}
            </div>
        </section>
    );
}
