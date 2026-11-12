import { describe, expect, it } from "vitest";
import { resolveBoardCategoryPath } from "../resolveBoardCategoryPath";
import {
  BOARD_CATEGORY_ID,
  BOARD_CATEGORY_PATH,
  OTHER_BOARD_CATEGORY_ID,
  OTHER_BOARD_CATEGORY_PATH,
} from "./BoardPaths.constants";

describe("resolveBoardCategoryPath", () => {
  it("builds the units screen path under the board categories path", () => {
    expect(
      resolveBoardCategoryPath(BOARD_CATEGORY_ID)
    ).toBe(BOARD_CATEGORY_PATH);
  });

  it("puts the given category id in the last segment", () => {
    expect(
      resolveBoardCategoryPath(OTHER_BOARD_CATEGORY_ID)
    ).toBe(OTHER_BOARD_CATEGORY_PATH);
  });
});
