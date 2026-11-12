import { DISPATCH_SHEET_LIMITS } from "../constants/DispatchSheet.constants";

const DECIMAL_SCALE =
  10 ** DISPATCH_SHEET_LIMITS.USAGE_DECIMALS;

export const isValidUsageReading = (
  usage: number
): boolean => {
  const scaled = usage * DECIMAL_SCALE;

  return (
    Number.isFinite(usage) &&
    usage >= 0 &&
    usage <= DISPATCH_SHEET_LIMITS.MAX_USAGE &&
    Math.abs(scaled - Math.round(scaled)) <
      DISPATCH_SHEET_LIMITS.USAGE_TOLERANCE
  );
};
