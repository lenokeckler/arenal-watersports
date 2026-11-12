import { PATHS } from "@/app/constants";
import {
  DAMAGE_REPORTS_PAGINATION,
  DAMAGE_REPORTS_QUERY_SEPARATOR,
  DAMAGE_REPORTS_UNIT_QUERY_KEY,
} from "../constants/DamageReports.constants";

export const getDamageReportsHref = (
  unitId: string,
  page: number = DAMAGE_REPORTS_PAGINATION.FIRST_PAGE
): string =>
  `${PATHS.OPERATIONS.DAMAGE_REPORTS}${DAMAGE_REPORTS_QUERY_SEPARATOR}${new URLSearchParams(
    {
      [DAMAGE_REPORTS_UNIT_QUERY_KEY]: unitId,
      [DAMAGE_REPORTS_PAGINATION.QUERY_KEY]: String(page),
    }
  ).toString()}`;
