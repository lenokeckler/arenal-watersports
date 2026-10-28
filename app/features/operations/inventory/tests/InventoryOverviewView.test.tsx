import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PATHS } from "@/app/constants";
import InventoryOverviewView from "../InventoryOverviewView";
import { createInventoryOverviewPage } from "./InventoryOverview.page";
import { INVENTORY_OVERVIEW_PAGE } from "./InventoryOverview.constants";
import {
  INVENTORY_BOAT_SUMMARY_ROW,
  INVENTORY_QUANTITY_SUMMARY_ROW,
  INVENTORY_UNIT_SUMMARY_ROW,
} from "./InventorySummaryMapper.constants";
import { mapInventorySummary } from "../utils/mapInventorySummary";

vi.mock("../InventoryRealtimeRefresh", () => ({
  default: () => null,
}));

describe("InventoryOverviewView", () => {
  it("shows inventory categories, their counts, and detail links", () => {
    render(
      <InventoryOverviewView
        inventoryPage={INVENTORY_OVERVIEW_PAGE}
      />
    );
    const inventoryOverviewPage =
      createInventoryOverviewPage();
    const unitCategory = mapInventorySummary(
      INVENTORY_UNIT_SUMMARY_ROW
    );
    const quantityCategory = mapInventorySummary(
      INVENTORY_QUANTITY_SUMMARY_ROW
    );
    const boatCategory = mapInventorySummary(
      INVENTORY_BOAT_SUMMARY_ROW
    );

    expect(
      inventoryOverviewPage.getInventoryHeading()
    ).toBeVisible();
    expect(
      inventoryOverviewPage.getCategoryLink(
        unitCategory.name
      )
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.INVENTORY_CATEGORY(unitCategory.id)
    );
    expect(
      inventoryOverviewPage.getCategoryMetricValue(
        unitCategory.name,
        unitCategory.available
      )
    ).toHaveTextContent(`${unitCategory.available}`);
    expect(
      inventoryOverviewPage.getCategoryLink(
        quantityCategory.name
      )
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.INVENTORY_CATEGORY(
        quantityCategory.id
      )
    );
    expect(
      inventoryOverviewPage.getCategoryLink(
        boatCategory.name
      )
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.INVENTORY_CATEGORY(boatCategory.id)
    );
  });
});
