import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import InventoryCounts from "../InventoryCounts";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { mapInventorySummary } from "../utils/mapInventorySummary";
import { createInventoryCountsPage } from "./InventoryCounts.page";
import {
  INVENTORY_QUANTITY_SUMMARY_ROW,
  INVENTORY_UNIT_SUMMARY_ROW,
} from "./InventorySummaryMapper.constants";

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
    countsPage.getMetricValue(INVENTORY_COPY.IN_MAINTENANCE)
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
    ...mapInventorySummary(INVENTORY_QUANTITY_SUMMARY_ROW),
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
