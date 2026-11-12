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
  duration_minutes: 90,
  ends_at: "2026-09-07T16:40:00.000Z",
  extended_minutes: 30,
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
] as const;

export const DELAY_CASES = [
  { minutes: 5, text: "5 min de retraso" },
  { minutes: 90, text: "1 h 30 min de retraso" },
] as const;

export const OUT_ON_WATER_GROUP_FIXTURE = {
  categoryId: OUT_ON_WATER_ROW_FIXTURE.category_id,
  categoryName: OUT_ON_WATER_ROW_FIXTURE.category_name,
  code: OUT_ON_WATER_ROW_FIXTURE.code,
  customerName: OUT_ON_WATER_ROW_FIXTURE.customer_name,
  dispatchId: OUT_ON_WATER_ROW_FIXTURE.dispatch_id,
  dispatchedAt: OUT_ON_WATER_ROW_FIXTURE.dispatched_at,
  durationMinutes:
    OUT_ON_WATER_ROW_FIXTURE.duration_minutes,
  endsAt: OUT_ON_WATER_ROW_FIXTURE.ends_at,
  extendedMinutes:
    OUT_ON_WATER_ROW_FIXTURE.extended_minutes,
  quantity: OUT_ON_WATER_ROW_FIXTURE.quantity,
  reservationId: OUT_ON_WATER_ROW_FIXTURE.reservation_id,
  unitCodes: OUT_ON_WATER_ROW_FIXTURE.unit_codes,
};

export const OUT_ON_WATER_TEXT = {
  CUSTOMER: "Ana Mora · RES-0001",
  EQUIPMENT: "Jet ski · JS-1, JS-2",
  HOURS: "Salió a las 09:10 · Regresa a las 10:40",
  LATE_5: "5 min de retraso",
  OVERDUE: "Por regresar",
  LATE_AFTER_MS: 45 * 60_000,
  REMAINING_39: "Faltan 39 min",
  REMAINING_40: "Faltan 40 min",
} as const;

export const ADJUST_INPUT_FIXTURE = {
  dispatchId: OUT_ON_WATER_ROW_FIXTURE.dispatch_id,
  durationMinutes: 120,
};

export const INVALID_ADJUST_INPUTS = [
  {
    input: {
      ...ADJUST_INPUT_FIXTURE,
      dispatchId: "not-a-uuid",
    },
    name: "an id that is not a uuid",
  },
  {
    input: { ...ADJUST_INPUT_FIXTURE, durationMinutes: 0 },
    name: "a duration of zero",
  },
  {
    input: {
      ...ADJUST_INPUT_FIXTURE,
      durationMinutes: 1441,
    },
    name: "a duration over a day",
  },
  {
    input: {
      ...ADJUST_INPUT_FIXTURE,
      durationMinutes: 30.5,
    },
    name: "a duration that is not whole minutes",
  },
] as const;

export const ADJUST_TEXT = {
  ADD_30: "+30 min",
  BUTTON: "Ajustar duración",
  CLOSED_ERROR:
    "Este grupo ya regresó y no se puede ajustar.",
  EXTENDED: "Se alargó 30 min.",
  FIELD: "Duración en minutos",
  FIELD_ERROR: "Escriba minutos enteros entre 1 y 1440.",
  MINUS_15: "−15 min",
  SAVE: "Guardar duración",
} as const;

export const ADJUST_MINUTES = {
  AFTER_ADD_30: "120",
  AFTER_MINUS_15: "90",
  INVALID: "abc",
  TOO_LONG: "1441",
} as const;
