import { describe, expect, it } from "vitest";
import { mapInventoryCategoryDetails } from "../utils/mapInventoryCategoryDetails";
import {
  EXPECTED_QUANTITY_INVENTORY_CATEGORY_DETAILS,
  EXPECTED_UNIT_INVENTORY_CATEGORY_DETAILS,
  MISSING_INVENTORY_CATEGORY_DETAILS,
  QUANTITY_INVENTORY_CATEGORY_DETAILS,
  UNIT_INVENTORY_CATEGORY_DETAILS,
} from "./InventoryCategoryDetails.constants";

describe("mapInventoryCategoryDetails", () => {
  it("maps a unit-tracked category and its page of units", () => {
    const categoryDetails = mapInventoryCategoryDetails(
      UNIT_INVENTORY_CATEGORY_DETAILS
    );

    expect(categoryDetails).toEqual(
      EXPECTED_UNIT_INVENTORY_CATEGORY_DETAILS
    );
  });

  it("maps a quantity-tracked category without a unit page", () => {
    const categoryDetails = mapInventoryCategoryDetails(
      QUANTITY_INVENTORY_CATEGORY_DETAILS
    );

    expect(categoryDetails).toEqual(
      EXPECTED_QUANTITY_INVENTORY_CATEGORY_DETAILS
    );
    expect(
      categoryDetails && "units" in categoryDetails
    ).toBe(false);
  });

  it("returns null for an unknown category", () => {
    expect(
      mapInventoryCategoryDetails(
        MISSING_INVENTORY_CATEGORY_DETAILS
      )
    ).toBeNull();
  });
});
