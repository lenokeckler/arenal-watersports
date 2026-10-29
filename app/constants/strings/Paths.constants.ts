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
    ROOT: "/administration",
    WORKER_AREAS: "/administration/workers/areas",
    WORKERS_NEW: "/administration/workers/new",
  },
  HOME: "/",
  MODE: "/mode",
  OPERATIONS: {
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
} as const;
