import {
  BOARD_UNIT_FILTER,
  type BoardUnitFilter,
} from "@/app/constants";
import type { BoardUnitCounts } from "@/app/components/board-unit-filter/models/BoardUnitCounts.interface";

export const resolveBoardFilterCount = (
  counts: BoardUnitCounts,
  filter: BoardUnitFilter
): number => {
  if (filter === BOARD_UNIT_FILTER.AVAILABLE) {
    return counts.available;
  }

  if (filter === BOARD_UNIT_FILTER.MAINTENANCE) {
    return counts.maintenance;
  }

  if (filter === BOARD_UNIT_FILTER.DAMAGED) {
    return counts.damaged;
  }

  return counts.total;
};
