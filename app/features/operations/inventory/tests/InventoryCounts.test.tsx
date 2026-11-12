import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import InventoryCounts from "../InventoryCounts";
import {
  INVENTORY_QUANTITY_COUNTS_CATEGORY,
  INVENTORY_UNIT_COUNTS_CATEGORY,
} from "./InventoryCounts.constants";
import { createInventoryCountsPage } from "./InventoryCounts.page";
import {
  INVENTORY_QUANTITY_SUMMARY_ROW,
  INVENTORY_UNIT_SUMMARY_ROW,
} from "./InventorySummaryMapper.constants";
import { mapInventorySummary } from "../utils/mapInventorySummary";

describe("InventoryCounts", () => {
  it("associates quantity counts with their condition labels", () => {
    const category = mapInventorySummary(
      INVENTORY_QUANTITY_SUMMARY_ROW
    );
    render(<InventoryCounts category={category} />);
    const countsPage = createInventoryCountsPage();

    expect(
      countsPage.getMetricValue(INVENTORY_COPY.AVAILABLE)
    ).toBe(`${category.available}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.DAMAGED)
    ).toBe(`${category.damaged}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.IN_REPAIR)
    ).toBe(`${category.inRepair}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.TOTAL)
    ).toBe(`${category.total}`);
    expect(
      countsPage.queryMetric(INVENTORY_COPY.IN_MAINTENANCE)
    ).not.toBeInTheDocument();
  });

  it("includes maintenance counts for individually tracked units", () => {
    const category = mapInventorySummary(
      INVENTORY_UNIT_SUMMARY_ROW
    );
    render(<InventoryCounts category={category} />);
    const countsPage = createInventoryCountsPage();

    expect(
      countsPage.getMetricValue(INVENTORY_COPY.AVAILABLE)
    ).toBe(`${category.available}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.DAMAGED)
    ).toBe(`${category.damaged}`);
    expect(
      countsPage.getMetricValue(
        INVENTORY_COPY.IN_MAINTENANCE
      )
    ).toBe(`${category.inMaintenance}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.IN_REPAIR)
    ).toBe(`${category.inRepair}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.TOTAL)
    ).toBe(`${category.total}`);
  });

  it("keeps zero quantities visible rather than omitting them", () => {
    const category = {
      ...mapInventorySummary(
        INVENTORY_QUANTITY_SUMMARY_ROW
      ),
      available: 0,
      damaged: 0,
      inRepair: 0,
      total: 0,
    };
    render(<InventoryCounts category={category} />);
    const countsPage = createInventoryCountsPage();

    expect(
      countsPage.getMetricValue(INVENTORY_COPY.AVAILABLE)
    ).toBe(`${category.available}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.DAMAGED)
    ).toBe(`${category.damaged}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.IN_REPAIR)
    ).toBe(`${category.inRepair}`);
    expect(
      countsPage.getMetricValue(INVENTORY_COPY.TOTAL)
    ).toBe(`${category.total}`);
  });

  it("shows the in-use count, including zero, before damaged units", () => {
    render(
      <InventoryCounts
        category={INVENTORY_UNIT_COUNTS_CATEGORY}
      />
    );
    const countsPage = createInventoryCountsPage();

    expect(countsPage.getInUseCount()).toBeInTheDocument();
    expect(countsPage.getZeroValues()).toHaveLength(1);
    expect(countsPage.getCountLabels()).toEqual([
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
    const countsPage = createInventoryCountsPage();

    expect(
      countsPage.getInUseCount()
    ).not.toBeInTheDocument();
    expect(countsPage.getCountLabels()).toEqual([
      INVENTORY_COPY.AVAILABLE,
      INVENTORY_COPY.DAMAGED,
      INVENTORY_COPY.IN_REPAIR,
      INVENTORY_COPY.TOTAL,
    ]);
  });
});
