import { LENGTH } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";

export const buildExtraCompatibilityProgressLabel = (
  linkedCount: number,
  unitCount: number
): string =>
  unitCount === LENGTH.ONE
    ? EXTRA_COMPATIBILITY_COPY.LINKED_OF_ONE_UNIT(
        linkedCount
      )
    : EXTRA_COMPATIBILITY_COPY.LINKED_OF_UNITS(
        linkedCount,
        unitCount
      );
