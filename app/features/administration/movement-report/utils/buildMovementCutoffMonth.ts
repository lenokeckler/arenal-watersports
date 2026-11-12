import { MOVEMENT_REPORT_LIMITS } from "../constants/MovementReport.constants";

const MONTHS_PER_YEAR = 12;
const MONTH_NUMBER_WIDTH = 2;

export const buildMovementCutoffMonth = (
  now: Date
): string => {
  const monthsSinceYearZero =
    now.getUTCFullYear() * MONTHS_PER_YEAR +
    now.getUTCMonth() -
    (MOVEMENT_REPORT_LIMITS.MONTHS_SHOWN - 1);
  const year = Math.floor(
    monthsSinceYearZero / MONTHS_PER_YEAR
  );
  const month = (monthsSinceYearZero % MONTHS_PER_YEAR) + 1;

  return `${year}-${String(month).padStart(MONTH_NUMBER_WIDTH, "0")}-01`;
};
