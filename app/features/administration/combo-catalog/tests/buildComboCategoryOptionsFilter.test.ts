import { describe, expect, it } from "vitest";
import { COMBO_CATEGORY_OPTIONS_FILTER } from "../constants/ComboCategoryOptionsFilter.constants";
import { buildComboCategoryOptionsFilter } from "../utils/buildComboCategoryOptionsFilter";
import {
  FAKE_CATEGORY_ID,
  SECOND_CATEGORY_ID,
} from "./ComboForm.constants";

describe("buildComboCategoryOptionsFilter", () => {
  it("keeps only active reservable categories without a selection", () => {
    expect(buildComboCategoryOptionsFilter([])).toBe(
      COMBO_CATEGORY_OPTIONS_FILTER.RESERVABLE_ACTIVE
    );
  });

  it("adds the selected categories to the active reservable ones", () => {
    const filter = buildComboCategoryOptionsFilter([
      FAKE_CATEGORY_ID,
      SECOND_CATEGORY_ID,
    ]);

    expect(filter).toContain(
      COMBO_CATEGORY_OPTIONS_FILTER.RESERVABLE_ACTIVE
    );
    expect(filter).toContain(
      `${FAKE_CATEGORY_ID}${COMBO_CATEGORY_OPTIONS_FILTER.FILTER_SEPARATOR}${SECOND_CATEGORY_ID}`
    );
  });
});
