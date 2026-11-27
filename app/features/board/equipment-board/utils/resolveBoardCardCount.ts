import {
  BOARD_UNIT_FILTER,
  type BoardUnitFilter,
} from "@/app/constants";
import { resolveBoardFilterCount } from "@/app/utils/board-unit-filter/resolveBoardFilterCount";
import type { BoardCard } from "../models/BoardCard.interface";
import { buildBoardUnitCounts } from "./buildBoardUnitCounts";

export const resolveBoardCardCount = (
  card: BoardCard,
  filter: BoardUnitFilter
): number =>
  filter === BOARD_UNIT_FILTER.ALL
    ? card.freeCount
    : resolveBoardFilterCount(
        buildBoardUnitCounts([card]),
        filter
      );
