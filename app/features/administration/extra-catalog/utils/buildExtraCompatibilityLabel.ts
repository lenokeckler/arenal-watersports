import { LENGTH } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";

export const buildExtraCompatibilityLabel = (
  unitCount: number
): string => {
  if (unitCount === LENGTH.ZERO) {
    return EXTRA_COMPATIBILITY_COPY.NO_UNITS;
  }
  if (unitCount === LENGTH.ONE) {
    return EXTRA_COMPATIBILITY_COPY.APPLIES_TO_ONE_UNIT;
  }
  return EXTRA_COMPATIBILITY_COPY.APPLIES_TO_UNITS(
    unitCount
  );
};
