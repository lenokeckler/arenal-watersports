import {
  BOARD_UNIT_FILTER,
  type BoardUnitFilter,
} from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { EQUIPMENT_BOARD_COUNT } from "../constants/EquipmentBoard.constants";
import type { BoardCard } from "../models/BoardCard.interface";
import { resolveBoardCardCount } from "./resolveBoardCardCount";
import { resolveFreeOfTotalText } from "./resolveFreeOfTotalText";

export const resolveBoardCardChipText = (
  card: BoardCard,
  filter: BoardUnitFilter
): string => {
  if (filter === BOARD_UNIT_FILTER.ALL) {
    return resolveFreeOfTotalText(
      card.freeCount,
      card.totalCount
    );
  }

  const count = resolveBoardCardCount(card, filter);
  const labels =
    EQUIPMENT_BOARD_COPY.FILTERED_LABELS[filter];

  return EQUIPMENT_BOARD_COPY.FILTERED_COUNT(
    count,
    count === EQUIPMENT_BOARD_COUNT.SINGULAR
      ? labels.SINGULAR
      : labels.PLURAL
  );
};
