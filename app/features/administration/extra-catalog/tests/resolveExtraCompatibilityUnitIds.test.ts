import { describe, expect, it } from "vitest";
import { resolveExtraCompatibilityUnitIds } from "../utils/resolveExtraCompatibilityUnitIds";
import {
  COMPATIBILITY_CATEGORY_ROW,
  DECOMMISSIONED_UNIT_ID,
  FREE_UNIT_ID,
  LINKED_UNIT_ID,
  OTHER_CATEGORY_UNIT_ID,
} from "./ExtraCompatibility.constants";

const categoryUnitRows =
  COMPATIBILITY_CATEGORY_ROW.equipment_units;

describe("resolveExtraCompatibilityUnitIds", () => {
  it("keeps the links of other categories and replaces the ones of the category", () => {
    expect(
      resolveExtraCompatibilityUnitIds({
        currentLinkedIds: [
          OTHER_CATEGORY_UNIT_ID,
          LINKED_UNIT_ID,
        ],
        categoryUnitRows,
        selectedUnitIds: [FREE_UNIT_ID],
      })
    ).toEqual([OTHER_CATEGORY_UNIT_ID, FREE_UNIT_ID]);
  });

  it("unlinks the whole category when nothing is selected", () => {
    expect(
      resolveExtraCompatibilityUnitIds({
        currentLinkedIds: [
          OTHER_CATEGORY_UNIT_ID,
          LINKED_UNIT_ID,
          DECOMMISSIONED_UNIT_ID,
        ],
        categoryUnitRows,
        selectedUnitIds: [],
      })
    ).toEqual([OTHER_CATEGORY_UNIT_ID]);
  });

  it("does not repeat a unit selected twice", () => {
    expect(
      resolveExtraCompatibilityUnitIds({
        currentLinkedIds: [],
        categoryUnitRows,
        selectedUnitIds: [LINKED_UNIT_ID, LINKED_UNIT_ID],
      })
    ).toEqual([LINKED_UNIT_ID]);
  });

  it.each([
    ["from another category", OTHER_CATEGORY_UNIT_ID],
    ["decommissioned", DECOMMISSIONED_UNIT_ID],
  ])(
    "returns null when a selected unit is %s",
    (_reason, unitId) => {
      expect(
        resolveExtraCompatibilityUnitIds({
          currentLinkedIds: [],
          categoryUnitRows,
          selectedUnitIds: [LINKED_UNIT_ID, unitId],
        })
      ).toBeNull();
    }
  );
});
