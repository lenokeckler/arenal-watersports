export const PATHS = {
  HOME: "/",
  ACCESS: {
    FIRST_SIGN_IN: "/access/first-sign-in",
    LOGIN: "/access/login",
    ROOT: "/access",
  },
  PROFILE: {
    PASSWORD: "/profile/password",
    ROOT: "/profile",
  },
  WELL_KNOWN: {
    CHANGE_PASSWORD: "/.well-known/change-password",
  },
} as const;
