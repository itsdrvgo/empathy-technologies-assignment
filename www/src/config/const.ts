export const DEFAULT_MESSAGES = {
    ERRORS: {
        GENERIC: "An error occurred, please try again later",
        USER_FETCHING: "Please wait while we fetch your user data",
        NOT_FOUND: "The requested resource was not found",
    },
} as const;

export const IG_ACCESS_TOKEN_COOKIE = "ig_test_access_token";
export const IG_EXPIRES_IN_COOKIE = "ig_test_expires_in";
