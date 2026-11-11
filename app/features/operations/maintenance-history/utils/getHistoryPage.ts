import type { NullableUndefined } from "@/app/types";
import {
  MAINTENANCE_HISTORY_PAGE_PATTERN,
  MAINTENANCE_HISTORY_PAGINATION,
} from "../constants/MaintenanceHistory.constants";

export const getHistoryPage = (
  param: NullableUndefined<string | string[]>
): number => {
  const parsed =
    typeof param === "string" &&
    MAINTENANCE_HISTORY_PAGE_PATTERN.test(param)
      ? Number(param)
      : Number.NaN;

  return Number.isSafeInteger(parsed) &&
    parsed >= MAINTENANCE_HISTORY_PAGINATION.FIRST_PAGE &&
    parsed <= MAINTENANCE_HISTORY_PAGINATION.MAX_PAGE
    ? parsed
    : MAINTENANCE_HISTORY_PAGINATION.FIRST_PAGE;
};
