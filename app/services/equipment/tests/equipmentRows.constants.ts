import type { EquipmentJobRow } from "../models/EquipmentJobRow.type";
import type { EquipmentReportRow } from "../models/EquipmentReportRow.type";

export const JOB_ROW: EquipmentJobRow = {
  cost_amount: null,
  cost_currency: null,
  description: null,
  id: "job",
  is_external: false,
  performed_at: "2026-11-20",
  unit: { code: "JET-09", status: "decommissioned" },
  unit_id: "unit",
  work_type: "other",
};

export const REPORT_ROW: EquipmentReportRow = {
  cause: null,
  created_at: "2026-11-20T15:00:00Z",
  description: null,
  detail_pending: true,
  id: "report",
  impact_delta: 1,
  reservation_id: null,
  unit: {
    category: { has_condition_photos: true },
    code: "JET-09",
    status: "decommissioned",
  },
  unit_id: "unit",
};
