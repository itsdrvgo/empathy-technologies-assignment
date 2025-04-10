import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Authentication",
        template: "%s - Authentication - " + siteConfig.name,
    },
    description: "Authorize your account to access the platform",
};

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="flex h-screen items-center justify-center">
            {children}
        </main>
    );
}
