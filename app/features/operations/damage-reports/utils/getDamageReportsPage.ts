import type { NullableUndefined } from "@/app/types";
import {
  DAMAGE_REPORTS_PAGE_PATTERN,
  DAMAGE_REPORTS_PAGINATION,
} from "../constants/DamageReports.constants";

export const getDamageReportsPage = (
  param: NullableUndefined<string | string[]>
): number => {
  const parsed =
    typeof param === "string" &&
    DAMAGE_REPORTS_PAGE_PATTERN.test(param)
      ? Number(param)
      : Number.NaN;

  return Number.isSafeInteger(parsed) &&
    parsed >= DAMAGE_REPORTS_PAGINATION.FIRST_PAGE &&
    parsed <= DAMAGE_REPORTS_PAGINATION.MAX_PAGE
    ? parsed
    : DAMAGE_REPORTS_PAGINATION.FIRST_PAGE;
};
