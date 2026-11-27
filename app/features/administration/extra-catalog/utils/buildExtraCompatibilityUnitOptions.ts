import { EXTRA_COMPATIBILITY_UNIT_STATUS_COPY } from "../constants/ExtraCompatibilityUnitStatusCopy.constants";
import type { ExtraCompatibilityUnit } from "../models/ExtraCompatibilityUnit.interface";
import type { ExtraCompatibilityUnitOption } from "../models/ExtraCompatibilityUnitOption.interface";

export const buildExtraCompatibilityUnitOptions = (
  units: ExtraCompatibilityUnit[],
  selectedUnitIds: readonly string[]
): ExtraCompatibilityUnitOption[] =>
  units.map((unit) => ({
    code: unit.code,
    id: unit.id,
    isChecked: selectedUnitIds.includes(unit.id),
    statusLabel:
      EXTRA_COMPATIBILITY_UNIT_STATUS_COPY[unit.status],
  }));
