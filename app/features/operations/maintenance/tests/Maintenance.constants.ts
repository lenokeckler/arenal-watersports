import type { MaintenanceOverview } from "../models/MaintenanceOverview.interface";
import type { MaintenanceUnit } from "../models/MaintenanceUnit.interface";

export const MAINTENANCE_ROWS = [
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000001",
    category_name: "Jet ski",
    code: "JS-1",
    next_oil_change_at: 100,
    oil_overage: 10,
    oil_remaining: -10,
    oil_warning: true,
    status: "available",
    unit_id: "bbbbbbbb-0000-0000-0000-000000000001",
    usage_metric: "engine_hours",
    usage_total: 110,
  },
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000002",
    category_name: "Cuadraciclo",
    code: "CU-1",
    next_oil_change_at: 5000,
    oil_overage: 0,
    oil_remaining: 0,
    oil_warning: true,
    status: "available",
    unit_id: "bbbbbbbb-0000-0000-0000-000000000002",
    usage_metric: "kilometers",
    usage_total: 5000,
  },
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000001",
    category_name: "Jet ski",
    code: "JS-2",
    next_oil_change_at: null,
    oil_overage: null,
    oil_remaining: null,
    oil_warning: false,
    status: "damaged",
    unit_id: "bbbbbbbb-0000-0000-0000-000000000003",
    usage_metric: "engine_hours",
    usage_total: 40.5,
  },
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000001",
    category_name: "Jet ski",
    code: "JS-3",
    next_oil_change_at: 100,
    oil_overage: 20,
    oil_remaining: -20,
    oil_warning: true,
    status: "in_repair",
    unit_id: "bbbbbbbb-0000-0000-0000-000000000004",
    usage_metric: "engine_hours",
    usage_total: 120,
  },
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000001",
    category_name: "Jet ski",
    code: "JS-4",
    next_oil_change_at: 100,
    oil_overage: null,
    oil_remaining: 5,
    oil_warning: true,
    status: "available",
    unit_id: "bbbbbbbb-0000-0000-0000-000000000005",
    usage_metric: "engine_hours",
    usage_total: 95,
  },
];

export const OIL_CARD_CASES = [
  {
    code: "JS-1",
    current: "110 h",
    next: "100 h",
    remaining: "−10 h",
  },
  {
    code: "CU-1",
    current: "5000 km",
    next: "5000 km",
    remaining: "0 km",
  },
  {
    code: "JS-4",
    current: "95 h",
    next: "100 h",
    remaining: "5 h",
  },
] as const;

const toUnit = (
  row: (typeof MAINTENANCE_ROWS)[number]
): MaintenanceUnit => ({
  categoryId: row.category_id,
  categoryName: row.category_name,
  code: row.code,
  nextOilChangeAt: row.next_oil_change_at,
  oilOverage: row.oil_overage,
  oilRemaining: row.oil_remaining,
  oilWarning: row.oil_warning,
  status: row.status as MaintenanceUnit["status"],
  unitId: row.unit_id,
  usageMetric:
    row.usage_metric as MaintenanceUnit["usageMetric"],
  usageTotal: row.usage_total,
});

export const MAINTENANCE_OVERVIEW_FIXTURE: MaintenanceOverview =
  {
    oilDue: MAINTENANCE_ROWS.filter(
      (row) => row.oil_warning
    ).map(toUnit),
    outOfService: MAINTENANCE_ROWS.filter(
      (row) => row.status !== "available"
    ).map(toUnit),
  };
