import { PAGINATION } from "./Pagination.constant";

const OPERATIONS_INVENTORY_PATH = "/operations/inventory";
const OPERATIONS_INVENTORY_COUNTS_PATH =
  "/operations/inventory-counts";

export const PATHS = {
  BOARD: "/board",
  BOARD_CATEGORIES: "/board/categories",
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
    CATEGORY_STOCK_SEGMENT: "stock",
    CATEGORY_UNITS_SEGMENT: "units",
    DEPOSITS: "/administration/reports/deposits",
    EQUIPMENT_HOURS:
      "/administration/reports/equipment-hours",
    MOVEMENT: "/administration/reports/movement",
    MAINTENANCE_COST:
      "/administration/reports/maintenance-cost",
    EXTRAS: "/administration/extras",
    EXTRAS_NEW: "/administration/extras/new",
    INCOME: "/administration/income",
    RESERVATIONS_BY_WORKER:
      "/administration/reports/reservations-by-worker",
    ROOT: "/administration",
    UNITS_NEW_SEGMENT: "new",
    WORKER_AREAS: "/administration/workers/areas",
    WORKERS: "/administration/workers",
    WORKERS_NEW: "/administration/workers/new",
  },
  HISTORY: {
    ROOT: "/history",
  },
  OPERATIONS: {
    CALENDAR: "/operations/calendar",
    DAMAGE_REPORT: "/operations/damage-report",
    INVENTORY: OPERATIONS_INVENTORY_PATH,
    INVENTORY_COUNT: (countId: string) =>
      `${OPERATIONS_INVENTORY_COUNTS_PATH}/${encodeURIComponent(countId)}`,
    INVENTORY_COUNT_NEW: `${OPERATIONS_INVENTORY_COUNTS_PATH}/new`,
    INVENTORY_COUNTS: OPERATIONS_INVENTORY_COUNTS_PATH,
    INVENTORY_CATEGORY: (categoryId: string) =>
      `${OPERATIONS_INVENTORY_PATH}/${encodeURIComponent(categoryId)}`,
    INVENTORY_CATEGORY_PAGE: (
      categoryId: string,
      pageIndex: number
    ) =>
      `${OPERATIONS_INVENTORY_PATH}/${encodeURIComponent(categoryId)}?${PAGINATION.QUERY_PARAMS.PAGE}=${pageIndex}`,
    INVENTORY_PAGE: (pageIndex: number) =>
      `${OPERATIONS_INVENTORY_PATH}?${PAGINATION.QUERY_PARAMS.PAGE}=${pageIndex}`,
    DAMAGE_REPORTS: "/operations/damage-reports",
    MAINTENANCE: "/operations/maintenance",
    MAINTENANCE_HISTORY: "/operations/maintenance/history",
    MAINTENANCE_NEW: "/operations/maintenance/new",
    OUT_ON_WATER: "/operations/out-on-water",
    UNIT_PHOTOS: (unitId: string) =>
      `/operations/unit-photos/${encodeURIComponent(unitId)}`,
    UNIT_READINGS: "/operations/unit-readings",
    UNIT_READING: (unitId: string) =>
      `/operations/unit-readings/${encodeURIComponent(unitId)}`,
    PENDING_DISPATCHES: "/operations/dispatch",
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
    EXTERNAL_GUIDE_NEW: "/reservations/guides/new",
    DETAIL: (reservationId: string): string =>
      `/reservations/${encodeURIComponent(reservationId)}`,
    DEPOSITS: "/reservations/deposits",
    CANCEL_SEGMENT: "cancel",
    EDIT_SEGMENT: "edit",
    INCOME: "/reservations/income",
    NEW: "/reservations/new",
    POSTPONE_SEGMENT: "postpone",
    ROOT: "/reservations",
    SPLIT_SEGMENT: "split",
  },
} as const;
