import { expect, it } from "vitest";
import { buildInventoryCountDifferences } from "../utils/buildInventoryCountDifferences";
import {
  QUANTITY_LINE_CHANGED,
  QUANTITY_LINE_WITHOUT_SNAPSHOT,
  UNIT_LINE_CHANGED,
  UNIT_LINE_SAME,
  UNIT_LINE_WITHOUT_SNAPSHOT,
} from "./InventoryCountHistory.constants";

it("keeps the units counted in another state and the quantities that changed", () => {
  expect(
    buildInventoryCountDifferences([
      UNIT_LINE_CHANGED,
      UNIT_LINE_SAME,
      QUANTITY_LINE_CHANGED,
    ])
  ).toEqual({
    quantityDifferences: [
      {
        categoryName: "Chalecos",
        changes: [
          { counted: 6, field: "available", system: 8 },
          { counted: 2, field: "inRepair", system: 0 },
        ],
      },
    ],
    unitDifferences: [
      {
        categoryName: "Jet Ski",
        code: "JET-02",
        countedStatus: "damaged",
        systemStatus: "available",
      },
    ],
  });
});

it("does not invent differences when the system snapshot is missing", () => {
  expect(
    buildInventoryCountDifferences([
      UNIT_LINE_WITHOUT_SNAPSHOT,
      QUANTITY_LINE_WITHOUT_SNAPSHOT,
    ])
  ).toEqual({
    quantityDifferences: [],
    unitDifferences: [],
  });
});

it("orders the units by code and the categories by name", () => {
  const result = buildInventoryCountDifferences([
    UNIT_LINE_CHANGED,
    { ...UNIT_LINE_CHANGED, unit: { code: "JET-01" } },
    {
      ...QUANTITY_LINE_CHANGED,
      category: { name: "Boyas" },
    },
    QUANTITY_LINE_CHANGED,
  ]);

  expect(
    result.unitDifferences.map((unit) => unit.code)
  ).toEqual(["JET-01", "JET-02"]);
  expect(
    result.quantityDifferences.map(
      (entry) => entry.categoryName
    )
  ).toEqual(["Boyas", "Chalecos"]);
});
