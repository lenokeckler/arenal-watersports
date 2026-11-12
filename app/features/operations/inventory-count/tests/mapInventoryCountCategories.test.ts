import { expect, it } from "vitest";
import { mapInventoryCountCategories } from "../utils/mapInventoryCountCategories";
import {
  INVENTORY_COUNT_CATEGORIES,
  INVENTORY_COUNT_ROWS,
} from "./InventoryCount.constants";

it("orders the units by code and leaves the decommissioned ones out", () => {
  expect(
    mapInventoryCountCategories(INVENTORY_COUNT_ROWS)
  ).toEqual(INVENTORY_COUNT_CATEGORIES);
});

it("reads a quantity category without stock as zero", () => {
  const [, quantityRow] = INVENTORY_COUNT_ROWS;

  expect(
    mapInventoryCountCategories([
      { ...quantityRow, stock: null },
    ])
  ).toEqual([
    {
      ...INVENTORY_COUNT_CATEGORIES[1],
      system: { available: 0, damaged: 0, inRepair: 0 },
    },
  ]);
});
