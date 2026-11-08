import { LENGTH } from "@/app/constants";
import {
  readBoardCategoryGroup,
  readBoardCategoryUnits,
} from "@/app/services/board";
import type { CategoryUnitsContent } from "../models/CategoryUnitsContent.interface";
import type { CategoryUnitsContentRequest } from "../models/CategoryUnitsContentRequest.interface";

export const readCategoryUnitsContent = async ({
  categoryId,
  page,
  pageCount,
}: CategoryUnitsContentRequest): Promise<CategoryUnitsContent> => {
  const [rows, groupMembers] = await Promise.all([
    pageCount === LENGTH.ZERO
      ? []
      : readBoardCategoryUnits(categoryId, page),
    readBoardCategoryGroup(categoryId),
  ]);

  return { groupMembers, rows };
};
