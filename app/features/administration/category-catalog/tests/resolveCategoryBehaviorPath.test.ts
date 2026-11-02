import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryBehaviorPath } from "../utils/resolveCategoryBehaviorPath";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

describe("resolveCategoryBehaviorPath", () => {
  it("places the category id between the list path and the behavior segment", () => {
    expect(
      resolveCategoryBehaviorPath(FAKE_CATEGORY_ID)
    ).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}/${FAKE_CATEGORY_ID}/${PATHS.ADMINISTRATION.CATEGORY_BEHAVIOR_SEGMENT}`
    );
  });
});
