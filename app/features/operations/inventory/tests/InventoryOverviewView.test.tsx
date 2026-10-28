import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { PATHS } from "@/app/constants";
import InventoryOverviewView from "../InventoryOverviewView";
import { mapInventorySummary } from "../utils/mapInventorySummary";
import { createInventoryOverviewPage } from "./InventoryOverview.page";
import { INVENTORY_OVERVIEW_PAGE } from "./InventoryOverview.constants";
import {
  INVENTORY_BOAT_SUMMARY_ROW,
  INVENTORY_QUANTITY_SUMMARY_ROW,
  INVENTORY_UNIT_SUMMARY_ROW,
} from "./InventorySummaryMapper.constants";

vi.mock("../InventoryRealtimeRefresh", () => ({
  default: () => null,
}));

const unitCategory = mapInventorySummary(
  INVENTORY_UNIT_SUMMARY_ROW
);
const quantityCategory = mapInventorySummary(
  INVENTORY_QUANTITY_SUMMARY_ROW
);
const boatCategory = mapInventorySummary(
  INVENTORY_BOAT_SUMMARY_ROW
);

const renderInventoryOverview = () => {
  render(
    <InventoryOverviewView
      inventoryPage={INVENTORY_OVERVIEW_PAGE}
    />
  );

  return createInventoryOverviewPage();
};

const expectCategoryLink = (
  inventoryOverviewPage: ReturnType<
    typeof createInventoryOverviewPage
  >,
  category: typeof unitCategory
): void => {
  expect(
    inventoryOverviewPage.getCategoryLink(category.name)
  ).toHaveAttribute(
    "href",
    PATHS.OPERATIONS.INVENTORY_CATEGORY(category.id)
  );
};

it("shows categories, counts, and detail links", () => {
  const inventoryOverviewPage = renderInventoryOverview();

  expect(
    inventoryOverviewPage.getInventoryHeading()
  ).toBeVisible();
  expectCategoryLink(inventoryOverviewPage, unitCategory);
  expect(
    inventoryOverviewPage.getCategoryMetricValue(
      unitCategory.name,
      unitCategory.available
    )
  ).toHaveTextContent(`${unitCategory.available}`);
  expectCategoryLink(
    inventoryOverviewPage,
    quantityCategory
  );
  expectCategoryLink(inventoryOverviewPage, boatCategory);
});
