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
