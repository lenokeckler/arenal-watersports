import { describe, expect, it } from "vitest";
import { mapCategoryRowToListItem } from "../utils/mapCategoryRowToListItem";
import { DEFAULT_EQUIPMENT_CATEGORY_ROW } from "./EquipmentCategoryRow.constants";

describe("mapCategoryRowToListItem", () => {
  it("marks hasRecords false when the category id is not in the set", () => {
    const categoryListItem = mapCategoryRowToListItem(
      DEFAULT_EQUIPMENT_CATEGORY_ROW,
      new Set()
    );

    expect(categoryListItem.hasRecords).toBe(false);
  });

  it("marks hasRecords true when the category id is in the set", () => {
    const categoryListItem = mapCategoryRowToListItem(
      DEFAULT_EQUIPMENT_CATEGORY_ROW,
      new Set([DEFAULT_EQUIPMENT_CATEGORY_ROW.id])
    );

    expect(categoryListItem.hasRecords).toBe(true);
  });

  it("maps a null group_name to no group", () => {
    const categoryRow = {
      ...DEFAULT_EQUIPMENT_CATEGORY_ROW,
      group_name: null,
    };

    const categoryListItem = mapCategoryRowToListItem(
      categoryRow,
      new Set()
    );

    expect(categoryListItem.groupName).toBeNull();
  });
});
