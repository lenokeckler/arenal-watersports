import { EQUIPMENT_BOARD_PERCENT } from "../constants/EquipmentBoard.constants";

export const computeFreePercent = (
  freeCount: number,
  totalCount: number
): number => {
  const hasFiniteCounts =
    Number.isFinite(freeCount) &&
    Number.isFinite(totalCount);

  if (!hasFiniteCounts || totalCount <= 0) {
    return 0;
  }

  const percent = Math.round(
    (freeCount / totalCount) * EQUIPMENT_BOARD_PERCENT.MAX
  );

  return Math.min(
    EQUIPMENT_BOARD_PERCENT.MAX,
    Math.max(0, percent)
  );
};
