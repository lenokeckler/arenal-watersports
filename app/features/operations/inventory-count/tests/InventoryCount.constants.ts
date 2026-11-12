import {
  INVENTORY_TRACKING_MODE,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import type { InventoryCountCategory } from "../models/InventoryCountCategory.type";
import type { InventoryCountCategoryRow } from "../models/InventoryCountCategoryRow.interface";

export const INVENTORY_COUNT_TEST = {
  CATEGORY_UNIT_ID: "aaaaaaaa-0000-0000-0000-000000000001",
  CATEGORY_QUANTITY_ID:
    "aaaaaaaa-0000-0000-0000-000000000002",
  DATABASE_ERROR: {
    code: "42501",
    message: "permission denied",
  },
  FIRST_UNIT_ID: "bbbbbbbb-0000-0000-0000-000000000001",
  NOTES: "Todo en orden",
  SECOND_UNIT_ID: "bbbbbbbb-0000-0000-0000-000000000002",
  UNKNOWN_OUTCOME: "something_else",
} as const;

export const INVENTORY_COUNT_ROWS: InventoryCountCategoryRow[] =
  [
    {
      id: INVENTORY_COUNT_TEST.CATEGORY_UNIT_ID,
      name: "Jet skis",
      stock: null,
      tracking_mode: INVENTORY_TRACKING_MODE.BY_UNIT,
      units: [
        {
          code: "JET-02",
          id: INVENTORY_COUNT_TEST.SECOND_UNIT_ID,
          status: INVENTORY_UNIT_STATUS.DAMAGED,
        },
        {
          code: "JET-01",
          id: INVENTORY_COUNT_TEST.FIRST_UNIT_ID,
          status: INVENTORY_UNIT_STATUS.AVAILABLE,
        },
        {
          code: "JET-03",
          id: "bbbbbbbb-0000-0000-0000-000000000003",
          status: INVENTORY_UNIT_STATUS.DECOMMISSIONED,
        },
      ],
    },
    {
      id: INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
      name: "Chalecos",
      stock: {
        quantity_available: 8,
        quantity_damaged: 1,
        quantity_in_repair: 2,
      },
      tracking_mode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
      units: [],
    },
  ];

export const INVENTORY_COUNT_CATEGORIES: InventoryCountCategory[] =
  [
    {
      id: INVENTORY_COUNT_TEST.CATEGORY_UNIT_ID,
      name: "Jet skis",
      trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
      units: [
        {
          code: "JET-01",
          id: INVENTORY_COUNT_TEST.FIRST_UNIT_ID,
          status: INVENTORY_UNIT_STATUS.AVAILABLE,
        },
        {
          code: "JET-02",
          id: INVENTORY_COUNT_TEST.SECOND_UNIT_ID,
          status: INVENTORY_UNIT_STATUS.DAMAGED,
        },
      ],
    },
    {
      id: INVENTORY_COUNT_TEST.CATEGORY_QUANTITY_ID,
      name: "Chalecos",
      system: { available: 8, damaged: 1, inRepair: 2 },
      trackingMode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
    },
  ];
