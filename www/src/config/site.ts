import { getAbsoluteURL } from "@/lib/utils";

export const siteConfig: SiteConfig = {
    name: "Instagram",
    description: "Instagram clone",
    longDescription: "Instagram clone",
    keywords: [],
    category: "Web Development",
    developer: {
        name: "DRVGO",
        url: "https://itsdrvgo.me/",
    },
    og: {
        url: getAbsoluteURL("/og.webp"),
        width: 1200,
        height: 630,
    },
    links: {
        Twitter: "https://x.com/itsdrvgo",
        Instagram: "https://www.instagram.com/itsdrvgo",
        Github: "https://github.com/itsdrvgo",
        Youtube: "https://youtube.com/@itsdrvgodev",
    },
};
