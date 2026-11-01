import { EQUIPMENT_BOARD_PERCENT } from "../constants/EquipmentBoard.constants";

export const computeOccupancyPercent = (
  inUseCount: number,
  totalCount: number
): number => {
  const hasFiniteCounts =
    Number.isFinite(inUseCount) &&
    Number.isFinite(totalCount);

  if (!hasFiniteCounts || totalCount <= 0) {
    return 0;
  }

  const percent = Math.round(
    (inUseCount / totalCount) * EQUIPMENT_BOARD_PERCENT.MAX
  );

  return Math.min(
    EQUIPMENT_BOARD_PERCENT.MAX,
    Math.max(0, percent)
  );
};
