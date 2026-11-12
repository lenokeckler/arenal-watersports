import { expect, it } from "vitest";
import {
  INVENTORY_COUNT_QUANTITY_FIELD,
  INVENTORY_COUNT_UNIT_STATUSES,
} from "../constants/InventoryCount.constants";
import { buildInventoryCountDraft } from "../utils/buildInventoryCountDraft";
import { buildInventoryCountInput } from "../utils/buildInventoryCountInput";
import {
  INVENTORY_COUNT_CATEGORIES,
  INVENTORY_COUNT_TEST,
} from "./InventoryCount.constants";

const [, damagedStatus] = INVENTORY_COUNT_UNIT_STATUSES;

it("starts from what the system has registered", () => {
  expect(
    buildInventoryCountDraft(INVENTORY_COUNT_CATEGORIES)
  ).toEqual({
    notes: "",
    quantities: {
      [INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID]: {
        available: "8",
        damaged: "1",
        inRepair: "2",
      },
    },
    unitStatuses: {
      [INVENTORY_COUNT_TEST.FIRST_UNIT_ID]: "available",
      [INVENTORY_COUNT_TEST.SECOND_UNIT_ID]: "damaged",
    },
  });
});

it("builds one line per unit and one per quantity category", () => {
  const draft = buildInventoryCountDraft(
    INVENTORY_COUNT_CATEGORIES
  );
  draft.notes = INVENTORY_COUNT_TEST.NOTES;
  draft.unitStatuses[INVENTORY_COUNT_TEST.FIRST_UNIT_ID] =
    damagedStatus;
  draft.quantities[
    INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID
  ][INVENTORY_COUNT_QUANTITY_FIELD.AVAILABLE] = "6";

  const { input, invalidCategoryIds } =
    buildInventoryCountInput(
      INVENTORY_COUNT_CATEGORIES,
      draft
    );

  expect(invalidCategoryIds.size).toBe(0);
  expect(input).toEqual({
    lines: [
      {
        categoryId: INVENTORY_COUNT_TEST.CATEGORY_UNIT_ID,
        confirmedStatus: "damaged",
        unitId: INVENTORY_COUNT_TEST.FIRST_UNIT_ID,
      },
      {
        categoryId: INVENTORY_COUNT_TEST.CATEGORY_UNIT_ID,
        confirmedStatus: "damaged",
        unitId: INVENTORY_COUNT_TEST.SECOND_UNIT_ID,
      },
      {
        categoryId:
          INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
        quantities: {
          available: 6,
          damaged: 1,
          inRepair: 2,
        },
      },
    ],
    notes: INVENTORY_COUNT_TEST.NOTES,
  });
});

it("flags the category whose quantity is not a number and builds nothing", () => {
  const draft = buildInventoryCountDraft(
    INVENTORY_COUNT_CATEGORIES
  );
  draft.quantities[
    INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID
  ][INVENTORY_COUNT_QUANTITY_FIELD.DAMAGED] = "-3";

  const { input, invalidCategoryIds } =
    buildInventoryCountInput(
      INVENTORY_COUNT_CATEGORIES,
      draft
    );

  expect(input).toBeNull();
  expect([...invalidCategoryIds]).toEqual([
    INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
  ]);
});

it("flags the category whose unit has no valid status", () => {
  const draft = buildInventoryCountDraft(
    INVENTORY_COUNT_CATEGORIES
  );
  draft.unitStatuses[INVENTORY_COUNT_TEST.FIRST_UNIT_ID] =
    "";

  expect(
    buildInventoryCountInput(
      INVENTORY_COUNT_CATEGORIES,
      draft
    ).input
  ).toBeNull();
});
