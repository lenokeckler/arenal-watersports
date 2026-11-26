import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryConfigurePath } from "../utils/resolveCategoryConfigurePath";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

describe("resolveCategoryConfigurePath", () => {
  it("places the category id right after the list path", () => {
    expect(
      resolveCategoryConfigurePath(FAKE_CATEGORY_ID)
    ).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}/${FAKE_CATEGORY_ID}`
    );
  });
});
