import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapBoardCategoryRow } from "../utils/mapBoardCategoryRow";
import { BOARD_CATEGORY_IMAGE_PATH } from "./BoardCategoryImage.constants";
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
      imagePath: FILLED_BOARD_CATEGORY_ROW.image_path,
      inUseCount: FILLED_BOARD_CATEGORY_ROW.in_use_count,
      name: FILLED_BOARD_CATEGORY_ROW.category_name,
      totalCount: FILLED_BOARD_CATEGORY_ROW.total_count,
    });
  });

  it("keeps the image path of a row that has an uploaded image", () => {
    const row = {
      ...FILLED_BOARD_CATEGORY_ROW,
      image_path: BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE,
    };

    expect(mapBoardCategoryRow(row).imagePath).toBe(
      BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE
    );
  });

  it("turns null columns into safe defaults and keeps a null group", () => {
    expect(
      mapBoardCategoryRow(NULL_BOARD_CATEGORY_ROW)
    ).toEqual({
      freeCount: 0,
      groupName: null,
      id: STRING.Empty,
      imagePath: null,
      inUseCount: 0,
      name: STRING.Empty,
      totalCount: 0,
    });
  });
});
