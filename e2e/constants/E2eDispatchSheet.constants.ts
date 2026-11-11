export const E2E_DISPATCH_SHEET_SEED = {
  CATEGORY_NAME_PREFIX: "E2E despacho",
  COMMITTED_QUANTITY: 2,
  DURATION_MINUTES: 60,
  PEOPLE_COUNT: 2,
  TYPE: "rental",
  UNIT_COUNT: 3,
  UNIT_CODE_PREFIX: "E2E-D",
} as const;

export const E2E_DISPATCH_SHEET_EXPECTED = {
  ONE_DISPATCH: 1,
  RESERVATION_STATUS: "dispatched",
} as const;

export const E2E_DISPATCH_SHEET_TABLE = {
  DISPATCHES: "reservation_dispatches",
  ITEMS: "reservation_items",
  RESERVATIONS: "reservations",
  UNITS: "equipment_units",
} as const;

export const E2E_DISPATCH_SHEET_ERROR = {
  OPERATION_INSERT_ITEM:
    "insert the E2E dispatch reservation item",
  OPERATION_INSERT_RESERVATION:
    "insert the E2E dispatch reservation",
  OPERATION_INSERT_UNITS: "insert the E2E dispatch units",
  OPERATION_READ_STATE: "read the E2E dispatch state",
  OPERATION_REMOVE: "remove the E2E dispatch fixture",
} as const;

export const E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME = {
  CHOOSING_UNITS: "06-dispatch-sheet-choosing-units",
  READY_TO_CONFIRM: "07-dispatch-sheet-ready-to-confirm",
} as const;
