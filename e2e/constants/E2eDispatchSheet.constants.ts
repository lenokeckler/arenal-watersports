export const E2E_DISPATCH_SHEET_SEED = {
  CATEGORY_NAME_PREFIX: "E2E despacho",
  COMMITTED_QUANTITY: 2,
  DURATION_MINUTES: 60,
  PEOPLE_COUNT: 2,
  TYPE: "rental",
  UNIT_COUNT: 3,
  UNIT_CODE_PREFIX: "E2E-D",
} as const;

export const E2E_DISPATCH_READINGS = {
  FIRST: {
    FUEL: 2,
    HOURS_TEXT: "13",
    PRESET: "Medio tanque: 2 de 4",
    USAGE: 13,
  },
  HOURS_BELOW_LAST: "12",
  HOURS_LABEL: "Horas de motor",
  LAST_FUEL: 2,
  LAST_USAGE: 12.5,
  SECOND: {
    FUEL: 4,
    HOURS_TEXT: "14,5",
    PRESET: "Lleno: 4 de 4",
    USAGE: 14.5,
  },
} as const;

export const E2E_DISPATCH_SHEET_EXPECTED = {
  ONE_DISPATCH: 1,
  RESERVATION_STATUS: "dispatched",
} as const;

export const E2E_DISPATCH_SHEET_TABLE = {
  CATEGORIES: "equipment_categories",
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
  OPERATION_MARK_MOTOR:
    "mark the E2E dispatch category as motor",
  OPERATION_READ_READINGS: "read the E2E dispatch readings",
  OPERATION_READ_STATE: "read the E2E dispatch state",
  OPERATION_REMOVE: "remove the E2E dispatch fixture",
} as const;

export const E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME = {
  CHOOSING_UNITS: "06-dispatch-sheet-choosing-units",
  READINGS: "08-dispatch-sheet-readings",
  READY_TO_CONFIRM: "07-dispatch-sheet-ready-to-confirm",
} as const;

export const E2E_BOARD_DISPATCH_SCREENSHOT_BASENAME = {
  PICKER: "10-board-reservation-picker",
  SELECTED_UNITS: "09-board-units-selected",
  SHEET: "11-board-dispatch-sheet",
} as const;
