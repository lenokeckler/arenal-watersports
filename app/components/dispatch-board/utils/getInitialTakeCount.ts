import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";

const MINIMUM_TAKE_COUNT = 1;

export const getInitialTakeCount = (
  group: DispatchSheetGroup,
  preselectedCount: number
): number => {
  if (preselectedCount < MINIMUM_TAKE_COUNT) {
    return group.requiredQuantity;
  }

  return Math.min(preselectedCount, group.requiredQuantity);
};
