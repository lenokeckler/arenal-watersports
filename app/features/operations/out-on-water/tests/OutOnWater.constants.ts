export const OUT_ON_WATER_NOW = new Date(
  "2026-09-07T16:00:00.000Z"
);

export const OUT_ON_WATER_ROW_FIXTURE = {
  category_id: "aaaaaaaa-0000-0000-0000-000000000001",
  category_name: "Jet ski",
  code: "RES-0001",
  customer_name: "Ana Mora",
  dispatch_id: "cccccccc-0000-0000-0000-000000000001",
  dispatched_at: "2026-09-07T15:10:00.000Z",
  ends_at: "2026-09-07T16:40:00.000Z",
  quantity: 2,
  reservation_id: "dddddddd-0000-0000-0000-000000000001",
  unit_codes: ["JS-1", "JS-2"],
};

export const REMAINING_CASES = [
  { endsAt: "2026-09-07T16:40:00.000Z", minutes: 40 },
  { endsAt: "2026-09-07T16:00:30.000Z", minutes: 1 },
  { endsAt: "2026-09-07T16:00:00.000Z", minutes: 0 },
  { endsAt: "2026-09-07T15:55:00.000Z", minutes: -5 },
] as const;

export const FORMAT_CASES = [
  { minutes: 65, text: "Faltan 1 h 5 min" },
  { minutes: 60, text: "Faltan 1 h" },
  { minutes: 12, text: "Faltan 12 min" },
  { minutes: 0, text: "Ya debe volver" },
  { minutes: -5, text: "Atrasado 5 min" },
  { minutes: -90, text: "Atrasado 1 h 30 min" },
] as const;

export const OUT_ON_WATER_GROUP_FIXTURE = {
  categoryId: OUT_ON_WATER_ROW_FIXTURE.category_id,
  categoryName: OUT_ON_WATER_ROW_FIXTURE.category_name,
  code: OUT_ON_WATER_ROW_FIXTURE.code,
  customerName: OUT_ON_WATER_ROW_FIXTURE.customer_name,
  dispatchId: OUT_ON_WATER_ROW_FIXTURE.dispatch_id,
  dispatchedAt: OUT_ON_WATER_ROW_FIXTURE.dispatched_at,
  endsAt: OUT_ON_WATER_ROW_FIXTURE.ends_at,
  quantity: OUT_ON_WATER_ROW_FIXTURE.quantity,
  reservationId: OUT_ON_WATER_ROW_FIXTURE.reservation_id,
  unitCodes: OUT_ON_WATER_ROW_FIXTURE.unit_codes,
};

export const OUT_ON_WATER_TEXT = {
  CUSTOMER: "Ana Mora · RES-0001",
  EQUIPMENT: "Jet ski · JS-1, JS-2",
  HOURS: "Salió a las 09:10 · Regresa a las 10:40",
  LATE_5: "Atrasado 5 min",
  LATE_AFTER_MS: 45 * 60_000,
  REMAINING_39: "Faltan 39 min",
  REMAINING_40: "Faltan 40 min",
} as const;
