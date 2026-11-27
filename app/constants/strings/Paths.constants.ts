import type { NullableRef } from "@/app/types";
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
    CATEGORY_IMAGE_SEGMENT: "image",
    CATEGORY_STOCK_SEGMENT: "stock",
    CATEGORY_UNITS_SEGMENT: "units",
    COMBOS: "/administration/combos",
    COMBOS_NEW: "/administration/combos/new",
    DEPOSITS: "/administration/reports/deposits",
    EQUIPMENT_HOURS:
      "/administration/reports/equipment-hours",
    MOVEMENT: "/administration/reports/movement",
    MAINTENANCE_COST:
      "/administration/reports/maintenance-cost",
    EXTRA_COMPATIBILITY_SEGMENT: "compatibility",
    EXTRAS: "/administration/extras",
    EXTRAS_NEW: "/administration/extras/new",
    INCOME: "/administration/income",
    RESERVATIONS_BY_WORKER:
      "/administration/reports/reservations-by-worker",
    ROOT: "/administration",
    TARIFFS: "/administration/tariffs",
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
    DAMAGE_REPORT_COMPLETE: (reportId: string) =>
      `/operations/damage-report?report=${encodeURIComponent(reportId)}`,
    DAMAGE_REPORT_FOR_UNIT: (unitId: string) =>
      `/operations/damage-report?unit=${encodeURIComponent(unitId)}`,
    DAMAGE_REPORTS: "/operations/damage-reports",
    DAMAGE_REPORTS_BY_CAUSE: (cause: string) =>
      `/operations/damage-reports?cause=${encodeURIComponent(cause)}`,
    DAMAGE_REPORTS_SAVED: (outcome: string) =>
      `/operations/damage-reports?saved=${encodeURIComponent(outcome)}`,
    EQUIPMENT: "/operations/equipment",
    EQUIPMENT_SPEND: (currency: string) =>
      `/operations/equipment?currency=${encodeURIComponent(currency)}`,
    MAINTENANCE: "/operations/maintenance",
    MAINTENANCE_SUMMARY: (
      month: string,
      currency: string
    ) =>
      `/operations/maintenance?tab=summary&bar=${encodeURIComponent(month)}&currency=${encodeURIComponent(currency)}`,
    MAINTENANCE_HISTORY: "/operations/maintenance/history",
    MAINTENANCE_NEW: "/operations/maintenance/new",
    MAINTENANCE_NEW_FOR_UNIT: (unitId: string) =>
      `/operations/maintenance/new?unit=${encodeURIComponent(unitId)}`,
    OUT_ON_WATER: "/operations/out-on-water",
    UNIT_HISTORY: (unitId: string) =>
      `/operations/unit-history/${encodeURIComponent(unitId)}`,
    UNIT_PHOTOS_ROOT: "/operations/unit-photos",
    UNIT_PHOTOS_FILTER: (
      categoryId: NullableRef<string>,
      page: number
    ) => {
      const query = new URLSearchParams();
      if (categoryId) {
        query.set("category", categoryId);
      }
      if (page > 1) {
        query.set(
          PAGINATION.QUERY_PARAMS.PAGE,
          page.toString()
        );
      }
      return query.size > 0
        ? `/operations/unit-photos?${query.toString()}`
        : "/operations/unit-photos";
    },
    PRICE_LOOKUP: "/operations/price-lookup",
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
    CHARGE_SEGMENT: "charge",
    DEPOSIT_SEGMENT: "deposit",
    EDIT_SEGMENT: "edit",
    EXTRA_TIME_SEGMENT: "extra-time",
    INCOME: "/reservations/income",
    NEW: "/reservations/new",
    POSTPONE_SEGMENT: "postpone",
    REFUND_SEGMENT: "refund",
    RESOLVE_SEGMENT: "resolve",
    ROOT: "/reservations",
    SPLIT_SEGMENT: "split",
  },
} as const;
