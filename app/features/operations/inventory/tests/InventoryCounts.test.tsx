import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import InventoryCounts from "../InventoryCounts";
import {
  INVENTORY_QUANTITY_COUNTS_CATEGORY,
  INVENTORY_UNIT_COUNTS_CATEGORY,
} from "./InventoryCounts.constants";
import { createInventoryCountsPage } from "./InventoryCounts.page";

describe("InventoryCounts", () => {
  it("shows the in-use count, including zero, before damaged units", () => {
    render(
      <InventoryCounts
        category={INVENTORY_UNIT_COUNTS_CATEGORY}
      />
    );
    const inventoryCountsPage = createInventoryCountsPage();

    expect(
      inventoryCountsPage.getInUseCount()
    ).toBeInTheDocument();
    expect(
      inventoryCountsPage.getZeroValues()
    ).toHaveLength(1);
    expect(inventoryCountsPage.getCountLabels()).toEqual([
      INVENTORY_COPY.AVAILABLE,
      INVENTORY_COPY.IN_USE,
      INVENTORY_COPY.DAMAGED,
      INVENTORY_COPY.IN_MAINTENANCE,
      INVENTORY_COPY.IN_REPAIR,
      INVENTORY_COPY.TOTAL,
    ]);
  });

  it("does not show in-use count for quantity-tracked categories", () => {
    render(
      <InventoryCounts
        category={INVENTORY_QUANTITY_COUNTS_CATEGORY}
      />
    );
    const inventoryCountsPage = createInventoryCountsPage();

    expect(
      inventoryCountsPage.getInUseCount()
    ).not.toBeInTheDocument();
    expect(inventoryCountsPage.getCountLabels()).toEqual([
      INVENTORY_COPY.AVAILABLE,
      INVENTORY_COPY.DAMAGED,
      INVENTORY_COPY.IN_REPAIR,
      INVENTORY_COPY.TOTAL,
    ]);
  });
});
