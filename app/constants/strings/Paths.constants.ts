export const PATHS = {
  HOME: "/",
  MODE: "/mode",
  ACCESS: {
    FIRST_SIGN_IN: "/access/first-sign-in",
    LOGIN: "/access/login",
    RECOVERY: "/access/recovery",
    RECOVERY_PASSWORD: "/access/recovery/password",
    RECOVERY_RESET: "/access/recovery/reset",
    ROOT: "/access",
  },
  ADMINISTRATION: {
    ROOT: "/administration",
    WORKER_AREAS: "/administration/workers/areas",
    WORKERS_NEW: "/administration/workers/new",
  },
  PROFILE: {
    EMAIL: "/profile/email",
    PASSWORD: "/profile/password",
    ROOT: "/profile",
  },
  WELL_KNOWN: {
    CHANGE_PASSWORD: "/.well-known/change-password",
  },
  RESERVATIONS: {
    CALENDAR: "/reservations/calendar",
    DEPOSITS: "/reservations/deposits",
    NEW: "/reservations/new",
  },
} as const;
