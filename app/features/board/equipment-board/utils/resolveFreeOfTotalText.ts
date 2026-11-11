import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { resolveFreeLabel } from "./resolveFreeLabel";

export const resolveFreeOfTotalText = (
  freeCount: number,
  totalCount: number
): string =>
  EQUIPMENT_BOARD_COPY.FREE_OF_TOTAL(
    freeCount,
    totalCount,
    resolveFreeLabel(freeCount)
  );
