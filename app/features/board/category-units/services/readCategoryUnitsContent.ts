import { LENGTH } from "@/app/constants";
import {
  readBoardCategoryGroup,
  readBoardCategoryUnits,
  readBoardUnitStatusDetails,
} from "@/app/services/board";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { CATEGORY_UNIT_STATUS_SHEET_STATUSES } from "../constants/CategoryUnits.constants";
import type { CategoryUnitsContent } from "../models/CategoryUnitsContent.interface";
import type { CategoryUnitsContentRequest } from "../models/CategoryUnitsContentRequest.interface";

export const readCategoryUnitsContent = async ({
  categoryId,
  filter,
  page,
  pageCount,
}: CategoryUnitsContentRequest): Promise<CategoryUnitsContent> => {
  const [rows, groupMembers] = await Promise.all([
    pageCount === LENGTH.ZERO
      ? []
      : readBoardCategoryUnits(categoryId, page, filter),
    readBoardCategoryGroup(categoryId),
  ]);

  const statusDetails = await readBoardUnitStatusDetails(
    rows
      .filter((row) =>
        CATEGORY_UNIT_STATUS_SHEET_STATUSES.includes(
          safeString(row.effective_status)
        )
      )
      .map((row) => safeString(row.unit_id))
  );

  return { groupMembers, rows, statusDetails };
};
