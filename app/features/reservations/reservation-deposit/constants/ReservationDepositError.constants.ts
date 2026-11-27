export const RESERVATION_DEPOSIT_ERROR = {
  MESSAGE: {
    ACCESS_REQUIRED: "Reservations access is required",
    ALREADY_DECIDED:
      "A deposit decision was already recorded",
    AMOUNT_INVALID: "Charge amount is invalid",
    AUTHENTICATION_REQUIRED:
      "Authenticated worker is required",
    CURRENCY_INVALID: "Charge currency is invalid",
    DECISION_REQUIRED: "A deposit decision is required",
    NOT_DEPOSITABLE:
      "Only scheduled or dispatched reservations can record a deposit",
    NOT_FOUND: "Reservation was not found",
    PAYLOAD_INVALID: "Reservation payload is invalid",
    PAYLOAD_NOT_OBJECT:
      "Reservation payload must be an object",
    SPLIT_CHILD:
      "A split reservation keeps its deposit on the original reservation",
  },
  OPERATION: {
    MISSING_DEPOSIT:
      "record reservation deposit returned no deposit",
    READ: "read reservation deposit",
    READ_PROPOSAL: "read reservation deposit proposal",
    RECORD: "record reservation deposit",
  },
} as const;
