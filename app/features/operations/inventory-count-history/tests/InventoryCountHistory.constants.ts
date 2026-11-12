import type { InventoryCountLineRow } from "../models/InventoryCountLineRow.interface";
import type { InventoryCountSummary } from "../models/InventoryCountSummary.interface";
import type { InventoryCountSummaryRow } from "../models/InventoryCountSummaryRow.interface";

export const INVENTORY_COUNT_HISTORY_TEST = {
  COUNT_ID: "cccccccc-0000-0000-0000-000000000001",
  DATABASE_ERROR: {
    code: "42501",
    message: "permission denied",
  },
  OTHER_COUNT_ID: "cccccccc-0000-0000-0000-000000000002",
} as const;

export const COUNT_SUMMARY_ROW: InventoryCountSummaryRow = {
  count_id: INVENTORY_COUNT_HISTORY_TEST.COUNT_ID,
  counted_at: "2026-11-10T15:30:00+00:00",
  counted_by: "Ana Operaciones",
  difference_count: 2,
  notes: "Conteo de noviembre",
  total_count: 25,
};

export const COUNT_SUMMARY: InventoryCountSummary = {
  countedAt: "2026-11-10T15:30:00+00:00",
  countedBy: "Ana Operaciones",
  differenceCount: 2,
  id: INVENTORY_COUNT_HISTORY_TEST.COUNT_ID,
  notes: "Conteo de noviembre",
};

const EMPTY_LINE: InventoryCountLineRow = {
  category: null,
  confirmed_status: null,
  quantity_available: null,
  quantity_damaged: null,
  quantity_in_repair: null,
  system_quantity_available: null,
  system_quantity_damaged: null,
  system_quantity_in_repair: null,
  system_status: null,
  unit: null,
  unit_id: null,
};

export const UNIT_LINE_CHANGED: InventoryCountLineRow = {
  ...EMPTY_LINE,
  category: { name: "Jet Ski" },
  confirmed_status: "damaged",
  system_status: "available",
  unit: { code: "JET-02" },
  unit_id: "bbbbbbbb-0000-0000-0000-000000000002",
};

export const UNIT_LINE_SAME: InventoryCountLineRow = {
  ...UNIT_LINE_CHANGED,
  confirmed_status: "available",
  unit: { code: "JET-01" },
  unit_id: "bbbbbbbb-0000-0000-0000-000000000001",
};

export const UNIT_LINE_WITHOUT_SNAPSHOT: InventoryCountLineRow =
  {
    ...UNIT_LINE_CHANGED,
    system_status: null,
    unit: { code: "JET-03" },
    unit_id: "bbbbbbbb-0000-0000-0000-000000000003",
  };

export const QUANTITY_LINE_CHANGED: InventoryCountLineRow =
  {
    ...EMPTY_LINE,
    category: { name: "Chalecos" },
    quantity_available: 6,
    quantity_damaged: 1,
    quantity_in_repair: 2,
    system_quantity_available: 8,
    system_quantity_damaged: 1,
    system_quantity_in_repair: 0,
  };

export const QUANTITY_LINE_WITHOUT_SNAPSHOT: InventoryCountLineRow =
  {
    ...QUANTITY_LINE_CHANGED,
    system_quantity_available: null,
    system_quantity_damaged: null,
    system_quantity_in_repair: null,
  };
