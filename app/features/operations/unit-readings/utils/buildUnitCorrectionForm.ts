import { UNIT_CORRECTION_COPY } from "../constants/UnitCorrectionCopy.constants";
import {
  UNIT_READINGS_LIMITS,
  UNIT_READINGS_STATUS,
} from "../constants/UnitReadings.constants";
import type { UnitCorrectionDraft } from "../models/UnitCorrectionDraft.interface";
import type { UnitCorrectionFormResult } from "../models/UnitCorrectionFormResult.interface";
import type { UnitCorrectionInput } from "../models/UnitCorrectionInput.interface";
import {
  parseUsage,
  parseWholeNumber,
} from "./parseUnitCorrectionNumber";

const STATUSES: readonly string[] = Object.values(
  UNIT_READINGS_STATUS
);

export const buildUnitCorrectionForm = (
  draft: UnitCorrectionDraft,
  unitId: string
): UnitCorrectionFormResult => {
  const fuelMax = parseWholeNumber(
    draft.fuelMax,
    UNIT_READINGS_LIMITS.FUEL_MAX_MAX
  );
  const validFuelMax =
    fuelMax !== null &&
    fuelMax >= UNIT_READINGS_LIMITS.FUEL_MAX_MIN
      ? fuelMax
      : null;
  const fuelLevel =
    validFuelMax === null
      ? null
      : parseWholeNumber(draft.fuelLevel, validFuelMax);
  const impactCount = parseWholeNumber(
    draft.impactCount,
    UNIT_READINGS_LIMITS.IMPACTS_MAX
  );
  const usageTotal = parseUsage(draft.usageTotal);
  const errors = {
    fuelLevel:
      fuelLevel === null
        ? UNIT_CORRECTION_COPY.ERROR_FUEL_LEVEL
        : null,
    fuelMax:
      validFuelMax === null
        ? UNIT_CORRECTION_COPY.ERROR_FUEL_MAX
        : null,
    impactCount:
      impactCount === null
        ? UNIT_CORRECTION_COPY.ERROR_IMPACTS
        : null,
    usageTotal:
      usageTotal === null
        ? UNIT_CORRECTION_COPY.ERROR_USAGE
        : null,
  };

  if (
    validFuelMax === null ||
    fuelLevel === null ||
    impactCount === null ||
    usageTotal === null ||
    !STATUSES.includes(draft.status)
  ) {
    return { errors, input: null };
  }

  const input: UnitCorrectionInput = {
    fuelLevel,
    fuelMax: validFuelMax,
    impactCount,
    status: draft.status as UnitCorrectionInput["status"],
    unitId,
    usageTotal,
  };

  return { errors, input };
};
