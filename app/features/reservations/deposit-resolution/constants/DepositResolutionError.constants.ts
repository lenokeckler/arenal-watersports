export const DEPOSIT_RESOLUTION_ERROR = {
  MESSAGE: {
    ACCESS_REQUIRED: "Reservations access is required",
    ALREADY_RESOLVED: "Deposit was already resolved",
    AMOUNT_ABOVE_DEPOSIT:
      "Returned amount exceeds the deposit",
    AMOUNT_INVALID: "Returned amount is invalid",
    AUTHENTICATION_REQUIRED:
      "Authenticated worker is required",
    NOT_FOUND: "Deposit was not found",
    PAYLOAD_INVALID: "Deposit payload is invalid",
    PAYLOAD_NOT_OBJECT: "Deposit payload must be an object",
    REASON_INVALID: "Damage reason is invalid",
    REASON_REQUIRED: "A damage reason is required",
    REASON_TOO_LONG: "Damage reason is too long",
    TRIP_NOT_CLOSED:
      "Only closed or cancelled reservations can resolve a deposit",
  },
  OPERATION: {
    MISSING_RESOLUTION:
      "resolve reservation deposit returned no deposit",
    READ: "read deposit to resolve",
    RESOLVE: "resolve reservation deposit",
  },
} as const;
