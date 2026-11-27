export const RESERVATION_REFUND_ERROR = {
  MESSAGE: {
    ACCESS_REQUIRED: "Reservations access is required",
    AMOUNT_INVALID: "Charge amount is invalid",
    AUTHENTICATION_REQUIRED:
      "Authenticated worker is required",
    CURRENCY_INVALID: "Charge currency is invalid",
    EXCEEDS_NET: "Refund amount exceeds the refundable net",
    NOT_FOUND: "Reservation was not found",
    PAYLOAD_INVALID: "Reservation payload is invalid",
    PAYLOAD_NOT_OBJECT:
      "Reservation payload must be an object",
    REASON_INVALID: "Refund reason is invalid",
    REASON_REQUIRED: "A refund reason is required",
    REASON_TOO_LONG: "Refund reason is too long",
  },
  OPERATION: {
    MISSING_REFUND:
      "record reservation refund returned no refund",
    READ: "read reservation refund",
    READ_NET: "read reservation refundable net",
    RECORD: "record reservation refund",
  },
} as const;
