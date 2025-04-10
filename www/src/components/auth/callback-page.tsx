"use client";

import { useAuth } from "@/lib/react-query";
import { sanitizeError } from "@/lib/utils";
import { useEffect } from "react";
import { Icons } from "../icons";

interface PageProps {
    code: string;
}

export function CallbackPage({ code }: PageProps) {
    const { useAuthCallback } = useAuth();
    const { mutate, error, isError } = useAuthCallback();

    useEffect(() => {
        mutate({ code });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isError ? (
        <p className="text-red-500">{sanitizeError(error)}</p>
    ) : (
        <Icons.Loader2 className="animate-spin" />
    );
}
