import { STRING } from "@/app/constants";
import { parseFuelInput } from "@/app/components/dispatch-board/utils/parseFuelInput";
import { parseUsageInput } from "@/app/components/dispatch-board/utils/parseUsageInput";
import { CLOSE_GROUP_COPY } from "../constants/CloseGroupCopy.constants";
import {
  CLOSE_GROUP_DAMAGE_CAUSE,
  CLOSE_GROUP_LIMITS,
} from "../constants/CloseGroup.constants";
import type {
  CloseGroupDamage,
  CloseGroupDamageCause,
} from "../models/CloseGroupDamage.interface";
import type { CloseGroupDraft } from "../models/CloseGroupDraft.interface";
import type { GroupReturnUnit } from "../models/GroupReturnUnit.interface";
import type { ReturnReadingRow } from "../models/ReturnReadingRow.interface";

const IMPACT_PATTERN = /^\d{1,4}$/;

const CAUSES: readonly string[] = Object.values(
  CLOSE_GROUP_DAMAGE_CAUSE
);

const isFilled = (text: string): boolean =>
  text.trim() !== STRING.Empty;

export const buildReturnReadingRow = (
  unit: GroupReturnUnit,
  draft: CloseGroupDraft
): ReturnReadingRow => {
  const fuelLevel = unit.consumesFuel
    ? parseFuelInput(draft.fuel, unit.fuelMax)
    : null;
  const typedUsage =
    unit.usageMetric === null
      ? null
      : parseUsageInput(draft.usage);
  const usageReading =
    typedUsage !== null &&
    typedUsage >= (unit.usageOut ?? 0)
      ? typedUsage
      : null;

  let usageError: ReturnReadingRow["usageError"] = null;

  if (unit.usageMetric !== null && isFilled(draft.usage)) {
    if (typedUsage === null) {
      usageError = CLOSE_GROUP_COPY.USAGE_INVALID;
    } else if (usageReading === null) {
      usageError = `${CLOSE_GROUP_COPY.USAGE_BELOW_PREFIX}${unit.usageOut}.`;
    }
  }

  const causeError =
    draft.hasDamage && !CAUSES.includes(draft.cause)
      ? CLOSE_GROUP_COPY.CAUSE_REQUIRED
      : null;
  const descriptionError =
    draft.hasDamage &&
    (!isFilled(draft.description) ||
      draft.description.length >
        CLOSE_GROUP_LIMITS.DESCRIPTION_MAX_LENGTH)
      ? CLOSE_GROUP_COPY.DESCRIPTION_REQUIRED
      : null;
  const impactError =
    draft.hasDamage &&
    isFilled(draft.impact) &&
    !IMPACT_PATTERN.test(draft.impact.trim())
      ? CLOSE_GROUP_COPY.IMPACT_INVALID
      : null;
  const damage: CloseGroupDamage | null =
    draft.hasDamage &&
    causeError === null &&
    descriptionError === null &&
    impactError === null
      ? {
          cause: draft.cause as CloseGroupDamageCause,
          description: draft.description.trim(),
          impactDelta: isFilled(draft.impact)
            ? Number(draft.impact.trim())
            : 0,
        }
      : null;

  const isComplete =
    (!unit.consumesFuel || fuelLevel !== null) &&
    (unit.usageMetric === null || usageReading !== null) &&
    (!draft.hasDamage || damage !== null);

  return {
    causeError,
    code: unit.code,
    consumesFuel: unit.consumesFuel,
    damage,
    descriptionError,
    draft,
    fuelError:
      unit.consumesFuel &&
      isFilled(draft.fuel) &&
      fuelLevel === null
        ? `${CLOSE_GROUP_COPY.FUEL_INVALID_PREFIX}${unit.fuelMax}.`
        : null,
    fuelLevel,
    fuelMax: unit.fuelMax,
    fuelOut: unit.fuelOut,
    impactError,
    isComplete,
    unitId: unit.unitId,
    usageError,
    usageMetric: unit.usageMetric,
    usageOut: unit.usageOut,
    usageReading,
  };
};
