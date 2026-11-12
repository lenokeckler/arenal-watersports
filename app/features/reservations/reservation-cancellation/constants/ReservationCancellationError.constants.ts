export const RESERVATION_CANCELLATION_ERROR = {
  MESSAGE: {
    ACCESS_REQUIRED: "Reservations access is required",
    NOT_CANCELLABLE:
      "Only scheduled reservations can be cancelled",
    NOT_FOUND: "Reservation was not found",
    PAYLOAD_INVALID: "Reservation payload is invalid",
    PAYLOAD_NOT_OBJECT:
      "Reservation payload must be an object",
    REASON_REQUIRED: "A cancellation reason is required",
    REASON_TOO_LONG: "Cancellation reason is too long",
    STALE: "Reservation changed since the form was loaded",
  },
  OPERATION: {
    CANCEL: "cancel reservation",
    MISSING_RESERVATION:
      "cancel reservation returned no reservation",
    READ: "read reservation cancellation",
  },
} as const;
