import { EQUIPMENT_PERIOD } from "@/app/constants";
import { shiftMonthKey } from "./listRecentMonths";

export const buildMonthRange = (
  month: string
): { before: string; since: string } => ({
  before: `${shiftMonthKey(month, 1)}${EQUIPMENT_PERIOD.FIRST_DAY_SUFFIX}`,
  since: `${month}${EQUIPMENT_PERIOD.FIRST_DAY_SUFFIX}`,
});
