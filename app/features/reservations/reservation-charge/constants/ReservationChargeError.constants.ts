export const RESERVATION_CHARGE_ERROR = {
  MESSAGE: {
    ACCESS_REQUIRED: "Reservations access is required",
    AMOUNT_INVALID: "Charge amount is invalid",
    AUTHENTICATION_REQUIRED:
      "Authenticated worker is required",
    CURRENCY_INVALID: "Charge currency is invalid",
    METHOD_INVALID: "Payment method is invalid",
    METHOD_REQUIRED: "A payment method is required",
    METHOD_TOO_LONG: "Payment method is too long",
    NOT_CHARGEABLE:
      "Only scheduled, dispatched or closed reservations can be charged",
    NOT_FOUND: "Reservation was not found",
    PAYLOAD_INVALID: "Reservation payload is invalid",
    PAYLOAD_NOT_OBJECT:
      "Reservation payload must be an object",
    SPLIT_CHILD:
      "A split reservation is charged on the original reservation",
  },
  OPERATION: {
    MISSING_CHARGE:
      "record reservation charge returned no charge",
    READ: "read reservation charge",
    READ_PROPOSAL: "read reservation charge proposal",
    RECORD: "record reservation charge",
  },
} as const;
