import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PATHS } from "@/app/constants";
import InventoryCategoryView from "../InventoryCategoryView";
import { mapInventoryCategoryDetails } from "../utils/mapInventoryCategoryDetails";
import {
  EXPECTED_QUANTITY_CATEGORY_DETAILS_ERROR,
  EXPECTED_UNIT_CATEGORY_DETAILS_ERROR,
  QUANTITY_INVENTORY_CATEGORY_DETAILS,
  UNIT_INVENTORY_CATEGORY_DETAILS,
} from "./InventoryCategoryDetails.constants";
import { createInventoryCategoryPage } from "./InventoryCategory.page";
import { EXPECTED_MAPPED_INVENTORY_UNITS } from "./InventoryUnitMapper.constants";

vi.mock("../InventoryRealtimeRefresh", () => ({
  default: () => null,
}));

describe("InventoryCategoryView", () => {
  it("shows each unit code and status in a unit-tracked category", () => {
    const categoryDetails = mapInventoryCategoryDetails(
      UNIT_INVENTORY_CATEGORY_DETAILS
    );

    if (!categoryDetails) {
      throw new Error(EXPECTED_UNIT_CATEGORY_DETAILS_ERROR);
    }

    render(
      <InventoryCategoryView
        categoryDetails={categoryDetails}
      />
    );
    const inventoryCategoryPage =
      createInventoryCategoryPage();

    expect(
      inventoryCategoryPage.getCategoryHeading(
        categoryDetails.category.name
      )
    ).toBeVisible();
    expect(
      inventoryCategoryPage.getBackLink()
    ).toHaveAttribute("href", PATHS.OPERATIONS.INVENTORY);
    EXPECTED_MAPPED_INVENTORY_UNITS.forEach((unit) => {
      expect(
        inventoryCategoryPage.getUnitCode(unit.code)
      ).toBeVisible();
      expect(
        inventoryCategoryPage.getUnitStatus(
          unit.code,
          unit.status
        )
      ).toBeVisible();
    });
  });

  it("shows quantity counts without rendering a unit list", () => {
    const categoryDetails = mapInventoryCategoryDetails(
      QUANTITY_INVENTORY_CATEGORY_DETAILS
    );

    if (!categoryDetails) {
      throw new Error(
        EXPECTED_QUANTITY_CATEGORY_DETAILS_ERROR
      );
    }

    render(
      <InventoryCategoryView
        categoryDetails={categoryDetails}
      />
    );
    const inventoryCategoryPage =
      createInventoryCategoryPage();

    expect(
      inventoryCategoryPage.getCategoryHeading(
        categoryDetails.category.name
      )
    ).toBeVisible();
    expect(
      inventoryCategoryPage.getCountValue(
        categoryDetails.category.available
      )
    ).toBeVisible();
    expect(
      inventoryCategoryPage.getCountValue(
        categoryDetails.category.damaged
      )
    ).toBeVisible();
    expect(
      inventoryCategoryPage.getCountValue(
        categoryDetails.category.inRepair
      )
    ).toBeVisible();
    expect(
      inventoryCategoryPage.getCountValue(
        categoryDetails.category.total
      )
    ).toBeVisible();
  });
});
