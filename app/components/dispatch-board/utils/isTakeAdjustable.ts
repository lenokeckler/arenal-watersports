import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";

const SINGLE_UNIT = 1;

export const isTakeAdjustable = (
  group: DispatchSheetGroup
): boolean =>
  group.isTrackedByUnit &&
  group.fixedUnitIds.length === 0 &&
  group.requiredQuantity > SINGLE_UNIT;
