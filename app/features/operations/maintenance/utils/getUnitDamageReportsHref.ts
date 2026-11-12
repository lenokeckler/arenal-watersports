import { PATHS } from "@/app/constants";
import { DAMAGE_REPORTS_LINK } from "../constants/Maintenance.constants";

export const getUnitDamageReportsHref = (
  unitId: string
): string =>
  `${PATHS.OPERATIONS.DAMAGE_REPORTS}${DAMAGE_REPORTS_LINK.QUERY_SEPARATOR}${new URLSearchParams(
    { [DAMAGE_REPORTS_LINK.UNIT_QUERY_KEY]: unitId }
  ).toString()}`;
