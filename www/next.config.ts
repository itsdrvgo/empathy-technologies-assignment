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
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Credentials",
                        value: "true",
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "https://qjnws0rz-3001.inc1.devtunnels.ms",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
