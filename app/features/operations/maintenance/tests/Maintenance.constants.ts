import type { MaintenanceOverview } from "../models/MaintenanceOverview.interface";
import type { MaintenanceUnit } from "../models/MaintenanceUnit.interface";

export const MAINTENANCE_ROWS = [
  {
    category_id: "aaaaaaaa-0000-0000-0000-000000000001",
    category_name: "Jet ski",
    code: "JS-1",
    next_oil_change_at: 100,
    oil_overage: 10,
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
    status: "in_repair",
    unit_id: "bbbbbbbb-0000-0000-0000-000000000004",
    usage_metric: "engine_hours",
    usage_total: 120,
  },
];

export const OIL_TEXT_CASES = [
  {
    code: "JS-1",
    text: "Acumulado: 110 h · Cambio a las 100 h · Se pasó 10 h",
  },
  {
    code: "CU-1",
    text: "Acumulado: 5000 km · Cambio a las 5000 km · Llegó justo a su cambio de aceite.",
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
  status: row.status as MaintenanceUnit["status"],
  unitId: row.unit_id,
  usageMetric:
    row.usage_metric as MaintenanceUnit["usageMetric"],
  usageTotal: row.usage_total,
});

export const MAINTENANCE_OVERVIEW_FIXTURE: MaintenanceOverview =
  {
    oilDue: MAINTENANCE_ROWS.filter(
      (row) => row.oil_overage !== null
    ).map(toUnit),
    outOfService: MAINTENANCE_ROWS.filter(
      (row) => row.status !== "available"
    ).map(toUnit),
  };
