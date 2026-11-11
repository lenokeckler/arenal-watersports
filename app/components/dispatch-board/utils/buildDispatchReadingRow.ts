import { STRING } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchCandidateUnit } from "../models/DispatchCandidateUnit.interface";
import type { DispatchReadingDraft } from "../models/DispatchReadingDraft.interface";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import type { DispatchUnitReadingRow } from "../models/DispatchUnitReadingRow.interface";
import { parseFuelInput } from "./parseFuelInput";
import { parseUsageInput } from "./parseUsageInput";

const isFilled = (text: string): boolean =>
  text.trim() !== STRING.Empty;

export const buildDispatchReadingRow = (
  unit: DispatchCandidateUnit,
  draft: DispatchReadingDraft,
  group: DispatchSheetGroup
): DispatchUnitReadingRow => {
  const fuelLevel = group.consumesFuel
    ? parseFuelInput(draft.fuel, unit.fuelMax)
    : null;
  const typedUsage =
    group.usageMetric === null
      ? null
      : parseUsageInput(draft.usage);
  const usageReading =
    typedUsage !== null && typedUsage >= unit.usageTotal
      ? typedUsage
      : null;
  const isUsageBelowTotal =
    typedUsage !== null && typedUsage < unit.usageTotal;
  const hasInvalidUsage =
    group.usageMetric !== null &&
    isFilled(draft.usage) &&
    typedUsage === null;

  let usageError: DispatchUnitReadingRow["usageError"] =
    null;

  if (hasInvalidUsage) {
    usageError = DISPATCH_SHEET_COPY.USAGE_INVALID;
  } else if (isUsageBelowTotal) {
    usageError = `${DISPATCH_SHEET_COPY.USAGE_BELOW_PREFIX}${unit.usageTotal}.`;
  }

  return {
    code: unit.code,
    fuelError:
      group.consumesFuel &&
      isFilled(draft.fuel) &&
      fuelLevel === null
        ? `${DISPATCH_SHEET_COPY.FUEL_INVALID_PREFIX}${unit.fuelMax}.`
        : null,
    fuelLevel,
    fuelMax: unit.fuelMax,
    fuelText: draft.fuel,
    previousFuel: unit.fuelLevel,
    unitId: unit.unitId,
    usageError,
    usageReading,
    usageText: draft.usage,
    usageTotal: unit.usageTotal,
  };
};
