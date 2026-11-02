import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapBoardCategoryRow } from "../utils/mapBoardCategoryRow";
import {
  FILLED_BOARD_CATEGORY_ROW,
  NULL_BOARD_CATEGORY_ROW,
} from "./EquipmentBoardUtils.constants";

describe("mapBoardCategoryRow", () => {
  it("maps a filled row into a board category", () => {
    expect(
      mapBoardCategoryRow(FILLED_BOARD_CATEGORY_ROW)
    ).toEqual({
      freeCount: FILLED_BOARD_CATEGORY_ROW.free_count,
      groupName: FILLED_BOARD_CATEGORY_ROW.group_name,
      id: FILLED_BOARD_CATEGORY_ROW.category_id,
      inUseCount: FILLED_BOARD_CATEGORY_ROW.in_use_count,
      name: FILLED_BOARD_CATEGORY_ROW.category_name,
      totalCount: FILLED_BOARD_CATEGORY_ROW.total_count,
    });
  });

  it("turns null columns into safe defaults and keeps a null group", () => {
    expect(
      mapBoardCategoryRow(NULL_BOARD_CATEGORY_ROW)
    ).toEqual({
      freeCount: 0,
      groupName: null,
      id: STRING.Empty,
      inUseCount: 0,
      name: STRING.Empty,
      totalCount: 0,
    });
  });
});
