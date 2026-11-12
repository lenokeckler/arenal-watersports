export const RESERVATION_POSTPONEMENT_ERROR = {
  MESSAGE: {
    ACCESS_REQUIRED: "Reservations access is required",
    CATEGORY_UNAVAILABLE:
      "Equipment category quantity is not available for reservation",
    CAUSE_REQUIRED: "A postponement cause is required",
    FUEL_INVALID: "Postponement fuel reading is invalid",
    NEW_START_NOT_LATER:
      "New start must be later than the current start and now",
    NOT_FOUND: "Reservation was not found",
    NOT_POSTPONABLE:
      "Only scheduled or dispatched reservations can be postponed",
    PAYLOAD_INVALID: "Reservation payload is invalid",
    PAYLOAD_NOT_OBJECT:
      "Reservation payload must be an object",
    READINGS_INCOMPLETE:
      "Postponement readings are incomplete",
    READINGS_MISMATCH:
      "Postponement readings do not match the reservation",
    REASON_REQUIRED: "Postponement reason is required",
    REASON_TOO_LONG: "Postponement reason is too long",
    SCHEDULE_INVALID:
      "A valid reservation date and time are required",
    STALE: "Reservation changed since the form was loaded",
    UNIT_CONFLICT:
      "Equipment unit conflicts with another reservation",
    UNIT_NO_FUEL: "Equipment unit does not consume fuel",
    UNIT_UNAVAILABLE:
      "Equipment unit is not available for reservation",
    USAGE_BACKWARDS:
      "Unit usage reading cannot go backwards",
    USAGE_BELOW_DEPARTURE:
      "Postponement usage reading cannot go below the dispatch reading",
    USAGE_INVALID: "Postponement usage reading is invalid",
    WEATHER_ONLY:
      "Dispatched reservations can only be postponed for weather",
  },
  OPERATION: {
    MISSING_RESERVATION:
      "postpone reservation returned no reservation",
    POSTPONE: "postpone reservation",
    READ: "read reservation postponement",
  },
} as const;
