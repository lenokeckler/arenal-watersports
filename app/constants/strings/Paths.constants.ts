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
    CATEGORIES: "/administration/categories",
    CATEGORIES_NEW: "/administration/categories/new",
    CATEGORY_ALERTS_SEGMENT: "alerts",
    CATEGORY_BEHAVIOR_SEGMENT: "behavior",
    CATEGORY_DEPOSIT_SEGMENT: "deposit",
    ROOT: "/administration",
    RESERVATIONS_BY_WORKER:
      "/administration/reports/reservations-by-worker",
    WORKER_AREAS: "/administration/workers/areas",
    WORKERS_NEW: "/administration/workers/new",
  },
  PROFILE: {
    EMAIL: "/profile/email",
    PASSWORD: "/profile/password",
    ROOT: "/profile",
  },
  OPERATIONS: {
    CALENDAR: "/operations/calendar",
  },
  WELL_KNOWN: {
    CHANGE_PASSWORD: "/.well-known/change-password",
  },
  RESERVATIONS: {
    CALENDAR: "/reservations/calendar",
    DEPOSITS: "/reservations/deposits",
    INCOME: "/reservations/income",
    NEW: "/reservations/new",
  },
} as const;
