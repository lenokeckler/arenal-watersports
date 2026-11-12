import { EQUIPMENT_BOARD_COUNT } from "../constants/EquipmentBoard.constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";

export const resolveFreeLabel = (
  freeCount: number
): string =>
  freeCount === EQUIPMENT_BOARD_COUNT.SINGULAR
    ? EQUIPMENT_BOARD_COPY.FREE_LABEL_SINGULAR
    : EQUIPMENT_BOARD_COPY.FREE_LABEL_PLURAL;
