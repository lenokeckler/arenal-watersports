import type { MaintenanceCostRow } from "../models/MaintenanceCostRow.interface";

export const COST_CATEGORY_NAMES = {
  "aaaaaaaa-0000-0000-0000-000000000001": "Jet ski",
  "aaaaaaaa-0000-0000-0000-000000000002": "Cuadraciclo",
};

export const COST_ROWS: MaintenanceCostRow[] = [
  {
    categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
    currency: "USD",
    lastPerformedAt: "2026-08-10",
    recordsCount: 1,
    totalCost: 120,
    unitCode: "JS-2",
    unitId: "bbbbbbbb-0000-0000-0000-000000000002",
  },
  {
    categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
    currency: "CRC",
    lastPerformedAt: "2026-09-06",
    recordsCount: 2,
    totalCost: 35000,
    unitCode: "JS-2",
    unitId: "bbbbbbbb-0000-0000-0000-000000000002",
  },
  {
    categoryId: "aaaaaaaa-0000-0000-0000-000000000002",
    currency: "CRC",
    lastPerformedAt: "2026-09-01",
    recordsCount: 1,
    totalCost: 8000.5,
    unitCode: "CU-1",
    unitId: "bbbbbbbb-0000-0000-0000-000000000001",
  },
];

export const COST_SERVICE_ROWS = COST_ROWS.map((row) => ({
  category_id: row.categoryId,
  currency: row.currency,
  last_performed_at: row.lastPerformedAt,
  records_count: row.recordsCount,
  total_cost: row.totalCost,
  unit_code: row.unitCode,
  unit_id: row.unitId,
}));

export const COST_CATEGORY_ROWS = Object.entries(
  COST_CATEGORY_NAMES
).map(([id, name]) => ({ id, name }));
