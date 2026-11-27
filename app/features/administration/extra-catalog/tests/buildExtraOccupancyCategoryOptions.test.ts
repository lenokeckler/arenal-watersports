import { describe, expect, it } from "vitest";
import { buildExtraOccupancyCategoryOptions } from "../utils/buildExtraOccupancyCategoryOptions";
import { includeOccupiedCategory } from "../utils/includeOccupiedCategory";
import {
  DEFAULT_EXTRA,
  FAKE_OCCUPIED_CATEGORY_ID,
  FAKE_OCCUPIED_CATEGORY_NAME,
  OCCUPIABLE_CATEGORIES,
  OCCUPYING_EXTRA,
} from "./Extra.constants";

const OTHER_CATEGORY = {
  id: "other-category-id",
  name: "Chaleco",
};

describe("buildExtraOccupancyCategoryOptions", () => {
  it("offers each category by id with its name as the label", () => {
    expect(
      buildExtraOccupancyCategoryOptions(
        OCCUPIABLE_CATEGORIES
      )
    ).toEqual([
      {
        key: FAKE_OCCUPIED_CATEGORY_ID,
        value: FAKE_OCCUPIED_CATEGORY_ID,
        label: FAKE_OCCUPIED_CATEGORY_NAME,
      },
    ]);
  });
});

describe("includeOccupiedCategory", () => {
  it("keeps the list when the extra occupies nothing", () => {
    expect(
      includeOccupiedCategory(
        OCCUPIABLE_CATEGORIES,
        DEFAULT_EXTRA
      )
    ).toBe(OCCUPIABLE_CATEGORIES);
  });

  it("keeps the list when the occupied category is already offered", () => {
    expect(
      includeOccupiedCategory(
        OCCUPIABLE_CATEGORIES,
        OCCUPYING_EXTRA
      )
    ).toBe(OCCUPIABLE_CATEGORIES);
  });

  it("adds the occupied category when it is no longer offered", () => {
    expect(
      includeOccupiedCategory(
        [OTHER_CATEGORY],
        OCCUPYING_EXTRA
      )
    ).toEqual([
      OTHER_CATEGORY,
      {
        id: FAKE_OCCUPIED_CATEGORY_ID,
        name: FAKE_OCCUPIED_CATEGORY_NAME,
      },
    ]);
  });
});
