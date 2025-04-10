import { env } from "@/../env";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <Button asChild>
            <Link href={env.NEXT_PUBLIC_BACKEND_URL + "/auth"}>
                <Icons.Instagram />
                Login w/ Instagram
            </Link>
        </Button>
    );
}
