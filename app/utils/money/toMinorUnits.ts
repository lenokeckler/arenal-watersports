import { MINOR_UNITS_PER_UNIT } from "@/app/constants";

export const toMinorUnits = (amount: number): number =>
  Math.round(amount * MINOR_UNITS_PER_UNIT);
