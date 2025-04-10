import type { NextConfig } from "next";
import "./env";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "scontent.cdninstagram.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "instagram.fccu31-1.fna.fbcdn.net",
                pathname: "/**",
            },
        ],
    },
    experimental: {
        authInterrupts: true,
    },
};

export default nextConfig;
