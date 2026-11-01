import { PAGINATION } from "./Pagination.constant";

const OPERATIONS_INVENTORY_PATH = "/operations/inventory";

export const PATHS = {
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
    CATEGORY_UNITS_SEGMENT: "units",
    RESERVATIONS_BY_WORKER:
      "/administration/reports/reservations-by-worker",
    ROOT: "/administration",
    UNITS_NEW_SEGMENT: "new",
    WORKER_AREAS: "/administration/workers/areas",
    WORKERS_NEW: "/administration/workers/new",
  },
  HOME: "/",
  MODE: "/mode",
  OPERATIONS: {
    CALENDAR: "/operations/calendar",
    INVENTORY: OPERATIONS_INVENTORY_PATH,
    INVENTORY_CATEGORY: (categoryId: string) =>
      `${OPERATIONS_INVENTORY_PATH}/${encodeURIComponent(categoryId)}`,
    INVENTORY_CATEGORY_PAGE: (
      categoryId: string,
      pageIndex: number
    ) =>
      `${OPERATIONS_INVENTORY_PATH}/${encodeURIComponent(categoryId)}?${PAGINATION.QUERY_PARAMS.PAGE}=${pageIndex}`,
    INVENTORY_PAGE: (pageIndex: number) =>
      `${OPERATIONS_INVENTORY_PATH}?${PAGINATION.QUERY_PARAMS.PAGE}=${pageIndex}`,
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
