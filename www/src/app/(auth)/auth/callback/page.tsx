import { CallbackPage } from "@/components/auth";

interface PageProps {
    searchParams: Promise<{
        code: string;
    }>;
}

export default function Page(props: PageProps) {
    return <CallbackFetch {...props} />;
}

async function CallbackFetch({ searchParams }: PageProps) {
    const { code } = await searchParams;

    return <CallbackPage code={code} />;
}
