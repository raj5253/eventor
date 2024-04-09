import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [ //accessible even if not logged in
        "/",
        "/events/:id",
        "/api/webhook/clerk",
        "/api/webhook/stripe",
        "/api/uploading",

    ],
    ignoredRoutes: [ //clerk ignore this route
        "/api/webhook/clerk",
        "/api/webhook/stripe",
        "/api/uploading",
        "/favicon.ico",
        "/assets/images/logo.svg",
        // "/assets/images/.{png,svg, jpg}" will see later

    ]
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
