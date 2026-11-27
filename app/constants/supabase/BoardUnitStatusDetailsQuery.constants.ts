export const BOARD_UNIT_STATUS_DETAILS_QUERY = {
  DAMAGE: {
    ORDER_BY: "created_at",
    PROJECTION:
      "id,unit_id,cause,description,detail_pending,created_at",
    TABLE: "damage_reports",
  },
  JOBS: {
    ORDER_BY: "performed_at",
    PROJECTION:
      "unit_id,work_type,description,is_external,cost_amount,cost_currency,performed_at",
    TABLE: "maintenance_records",
  },
  UNIT_COLUMN: "unit_id",
} as const;

export const BOARD_UNIT_STATUS_DETAILS_OPERATION =
  "read board unit status details";
