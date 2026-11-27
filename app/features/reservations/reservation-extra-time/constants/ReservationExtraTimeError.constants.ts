export const RESERVATION_EXTRA_TIME_ERROR = {
  MESSAGE: {
    ACCESS_REQUIRED: "Reservations access is required",
    ALREADY_RESOLVED: "Extra time was already resolved",
    AMOUNT_INVALID: "Charge amount is invalid",
    AUTHENTICATION_REQUIRED:
      "Authenticated worker is required",
    COURTESY_WITH_CHARGE: "A courtesy carries no charge",
    CURRENCY_INVALID: "Charge currency is invalid",
    GROUPS_OUT:
      "Extra time is resolved once every group is back",
    METHOD_INVALID: "Payment method is invalid",
    METHOD_REQUIRED: "A payment method is required",
    METHOD_TOO_LONG: "Payment method is too long",
    NO_EXTRA_TIME: "The reservation has no extra time",
    NOT_FOUND: "Reservation was not found",
    OUTCOME_INVALID: "Extra time outcome is invalid",
    PAYLOAD_INVALID: "Reservation payload is invalid",
    PAYLOAD_NOT_OBJECT:
      "Reservation payload must be an object",
  },
  OPERATION: {
    MISSING_RECORD:
      "record reservation extra time returned no decision",
    READ_GROUPS: "read reservation extra time groups",
    READ_RESERVATION: "read reservation for extra time",
    READ_RESOLUTION: "read reservation extra time decision",
    RECORD: "record reservation extra time",
    REVALIDATE: "revalidate reservation extra time paths",
  },
} as const;
