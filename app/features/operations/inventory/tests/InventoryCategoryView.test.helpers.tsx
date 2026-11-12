import { render } from "@testing-library/react";
import { expect } from "vitest";
import { PAGINATION } from "@/app/constants";
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

export const renderUnitCategory = () => {
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

  return {
    categoryDetails,
    inventoryCategoryPage: createInventoryCategoryPage(),
  };
};

export const renderQuantityCategory = () => {
  const categoryDetails = mapInventoryCategoryDetails(
    QUANTITY_INVENTORY_CATEGORY_DETAILS
  );

  if (!categoryDetails) {
    throw new Error(
      EXPECTED_QUANTITY_CATEGORY_DETAILS_ERROR
    );
  }

  if ("movements" in categoryDetails) {
    categoryDetails.movements.pageCount =
      PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE;
  }

  const { rerender } = render(
    <InventoryCategoryView
      categoryDetails={categoryDetails}
    />
  );

  return {
    categoryDetails,
    inventoryCategoryPage: createInventoryCategoryPage(),
    rerender,
  };
};

export const expectUnitCodesAndStatuses = (): void => {
  const inventoryCategoryPage =
    createInventoryCategoryPage();

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
};
