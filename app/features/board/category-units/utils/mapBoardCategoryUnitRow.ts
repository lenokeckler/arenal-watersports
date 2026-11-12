import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { BoardCategoryUnitRow } from "@/app/services/board";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import { buildUnitOccupancy } from "./buildUnitOccupancy";
import { resolveBoardUnitStatus } from "./resolveBoardUnitStatus";

export const mapBoardCategoryUnitRow = (
  row: BoardCategoryUnitRow,
  now: Date
): CategoryUnit => {
  const status = resolveBoardUnitStatus(
    row.effective_status
  );
  const isOccupied =
    status === INVENTORY_UNIT_STATUS.OCCUPIED;

  return {
    code: safeString(row.unit_code),
    id: safeString(row.unit_id),
    occupancy: isOccupied
      ? buildUnitOccupancy(row, now)
      : null,
    status,
  };
};
