import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryDepositPath } from "../utils/resolveCategoryDepositPath";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

describe("resolveCategoryDepositPath", () => {
  it("places the category id between the list path and the deposit segment", () => {
    expect(
      resolveCategoryDepositPath(FAKE_CATEGORY_ID)
    ).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}/${FAKE_CATEGORY_ID}/${PATHS.ADMINISTRATION.CATEGORY_DEPOSIT_SEGMENT}`
    );
  });
});
