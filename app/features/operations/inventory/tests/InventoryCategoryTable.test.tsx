import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import InventoryCategoryTable from "../components/InventoryCategoryTable";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { mapInventorySummary } from "../utils/mapInventorySummary";
import { INVENTORY_OVERVIEW_PAGE } from "./InventoryOverview.constants";
import { INVENTORY_UNIT_SUMMARY_ROW } from "./InventorySummaryMapper.constants";

const unit = mapInventorySummary(
  INVENTORY_UNIT_SUMMARY_ROW
);

it("lists each category as a row with its mode, totals and a link to its detail", () => {
  render(
    <InventoryCategoryTable
      inventoryPage={INVENTORY_OVERVIEW_PAGE}
    />
  );

  expect(
    screen.getByRole("table", {
      name: INVENTORY_COPY.TABLE_LABEL,
    })
  ).toBeInTheDocument();
  expect(screen.getAllByRole("row")).toHaveLength(
    INVENTORY_OVERVIEW_PAGE.items.length + 1
  );
  expect(
    screen.getByRole("link", { name: unit.name })
  ).toHaveAttribute(
    "href",
    PATHS.OPERATIONS.INVENTORY_CATEGORY(unit.id)
  );
  expect(
    screen.getByRole("columnheader", {
      name: INVENTORY_COPY.COLUMN_AVAILABLE,
    })
  ).toBeInTheDocument();
});

it("says there are no categories for the filters", () => {
  render(
    <InventoryCategoryTable
      inventoryPage={{
        ...INVENTORY_OVERVIEW_PAGE,
        items: [],
      }}
    />
  );

  expect(
    screen.getByText(INVENTORY_COPY.INVENTORY_EMPTY)
  ).toBeInTheDocument();
});
