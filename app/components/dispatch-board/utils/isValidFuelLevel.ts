import { DISPATCH_SHEET_LIMITS } from "../constants/DispatchSheet.constants";

export const isValidFuelLevel = (level: number): boolean =>
  Number.isInteger(level) &&
  level >= 0 &&
  level <= DISPATCH_SHEET_LIMITS.MAX_FUEL_LINES;
