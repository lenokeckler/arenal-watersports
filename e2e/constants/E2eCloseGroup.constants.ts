export const E2E_CLOSE_GROUP = {
  CAUSE_LABEL: "Choque",
  DESCRIPTION: "Casco rajado",
  FIRST: {
    FUEL: 2,
    HOURS_TEXT: "15",
    PRESET: "Medio tanque: 2 de 4",
    USAGE: 15,
  },
  HOURS_BELOW_DEPARTURE: "12",
  SECOND: {
    FUEL: 4,
    HOURS_TEXT: "16,5",
    PRESET: "Lleno: 4 de 4",
    USAGE: 16.5,
  },
  UNIT_DAMAGED: "damaged",
  UNIT_IN_MAINTENANCE: "in_maintenance",
  UNIT_AVAILABLE: "available",
  RESERVATION_CLOSED: "closed",
  RESERVATION_OPEN: "dispatched",
  ONE_REPORT: 1,
} as const;

export const E2E_CLOSE_GROUP_SCREENSHOT_BASENAME = {
  SHEET: "15-close-group-sheet",
  DAMAGE: "16-close-group-damage",
  MAINTENANCE: "18-close-group-maintenance",
} as const;
