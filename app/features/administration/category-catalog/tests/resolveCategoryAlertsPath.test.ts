import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryAlertsPath } from "../utils/resolveCategoryAlertsPath";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

describe("resolveCategoryAlertsPath", () => {
  it("places the category id between the list path and the alerts segment", () => {
    expect(
      resolveCategoryAlertsPath(FAKE_CATEGORY_ID)
    ).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}/${FAKE_CATEGORY_ID}/${PATHS.ADMINISTRATION.CATEGORY_ALERTS_SEGMENT}`
    );
  });
});
