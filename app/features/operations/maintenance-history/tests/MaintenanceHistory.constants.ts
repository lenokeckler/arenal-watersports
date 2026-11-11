import type { MaintenanceHistoryEntry } from "../models/MaintenanceHistoryEntry.interface";

export const HISTORY_ROW = {
  cost_amount: 35000,
  cost_currency: "CRC",
  description: "Manubrio nuevo",
  id: "eeeeeeee-0000-0000-0000-000000000001",
  is_external: true,
  performed_at: "2026-09-06",
  unit: { category: { name: "Jet ski" }, code: "JS-1" },
  work_type: "part_change",
};

export const HISTORY_FREE_ROW = {
  ...HISTORY_ROW,
  cost_amount: null,
  cost_currency: null,
  description: null,
  id: "eeeeeeee-0000-0000-0000-000000000002",
  is_external: false,
  performed_at: "2026-09-01",
  work_type: "tire_change",
};

export const HISTORY_ENTRY: MaintenanceHistoryEntry = {
  categoryName: "Jet ski",
  costAmount: 35000,
  costCurrency: "CRC",
  description: "Manubrio nuevo",
  id: HISTORY_ROW.id,
  isExternal: true,
  performedAt: "2026-09-06",
  unitCode: "JS-1",
  workType: "part_change",
};

export const HISTORY_FREE_ENTRY: MaintenanceHistoryEntry = {
  ...HISTORY_ENTRY,
  costAmount: null,
  costCurrency: null,
  description: null,
  id: HISTORY_FREE_ROW.id,
  isExternal: false,
  performedAt: "2026-09-01",
  workType: "tire_change",
};

export const PAGE_CASES: Array<{
  expected: number;
  param: string | string[] | undefined;
}> = [
  { expected: 1, param: undefined },
  { expected: 1, param: "abc" },
  { expected: 1, param: "0" },
  { expected: 1, param: "-3" },
  { expected: 1, param: ["2", "3"] },
  { expected: 1, param: "100001" },
  { expected: 3, param: "3" },
];

export const DETAIL_CASES = [
  {
    entry: HISTORY_ENTRY,
    text: "06/09/2026 · Costo: 35000 CRC · Taller externo",
  },
  {
    entry: HISTORY_FREE_ENTRY,
    text: "01/09/2026 · Sin costo",
  },
] as const;
