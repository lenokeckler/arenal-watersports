import { expect, it } from "vitest";
import { buildInventoryCountContent } from "../utils/buildInventoryCountContent";
import {
  QUANTITY_LINE_CHANGED,
  UNIT_LINE_CHANGED,
  UNIT_LINE_SAME,
  UNIT_LINE_WITHOUT_SNAPSHOT,
} from "./InventoryCountHistory.constants";

it("lists everything that was counted by category, with the units by code and the differences marked", () => {
  expect(
    buildInventoryCountContent([
      UNIT_LINE_CHANGED,
      UNIT_LINE_SAME,
      QUANTITY_LINE_CHANGED,
    ])
  ).toEqual([
    {
      differenceCount: 1,
      name: "Chalecos",
      quantities: [
        {
          counted: 6,
          differs: true,
          field: "available",
          system: 8,
        },
        {
          counted: 1,
          differs: false,
          field: "damaged",
          system: 1,
        },
        {
          counted: 2,
          differs: true,
          field: "inRepair",
          system: 0,
        },
      ],
      units: [],
    },
    {
      differenceCount: 1,
      name: "Jet Ski",
      quantities: [],
      units: [
        {
          code: "JET-01",
          countedStatus: "available",
          differs: false,
          systemStatus: "available",
        },
        {
          code: "JET-02",
          countedStatus: "damaged",
          differs: true,
          systemStatus: "available",
        },
      ],
    },
  ]);
});

it("does not mark a difference when the system snapshot is missing", () => {
  const [category] = buildInventoryCountContent([
    UNIT_LINE_WITHOUT_SNAPSHOT,
  ]);

  expect(category.differenceCount).toBe(0);
  expect(category.units[0].differs).toBe(false);
  expect(category.units[0].systemStatus).toBeNull();
});
