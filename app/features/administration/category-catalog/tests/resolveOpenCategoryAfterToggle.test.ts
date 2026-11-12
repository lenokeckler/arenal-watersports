import { describe, expect, it } from "vitest";
import { resolveOpenCategoryAfterToggle } from "../utils/resolveOpenCategoryAfterToggle";

const FIRST_CATEGORY_ID = "first";
const SECOND_CATEGORY_ID = "second";

describe("resolveOpenCategoryAfterToggle", () => {
  it("opens the category when none is open", () => {
    expect(
      resolveOpenCategoryAfterToggle(
        null,
        FIRST_CATEGORY_ID
      )
    ).toBe(FIRST_CATEGORY_ID);
  });

  it("closes the category that is already open", () => {
    expect(
      resolveOpenCategoryAfterToggle(
        FIRST_CATEGORY_ID,
        FIRST_CATEGORY_ID
      )
    ).toBeNull();
  });

  it("moves the open panel to the category that was pressed", () => {
    expect(
      resolveOpenCategoryAfterToggle(
        FIRST_CATEGORY_ID,
        SECOND_CATEGORY_ID
      )
    ).toBe(SECOND_CATEGORY_ID);
  });
});
