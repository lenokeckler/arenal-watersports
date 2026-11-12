import { MINOR_UNITS_PER_UNIT } from "@/app/constants";

export const fromMinorUnits = (
  minorUnits: number
): number => minorUnits / MINOR_UNITS_PER_UNIT;
