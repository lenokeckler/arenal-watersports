export const RESERVATION_CHARGE_FEEDBACK_COPY = {
  FORBIDDEN:
    "Su cuenta no puede registrar cobros. Pida acceso a administración.",
  GENERIC:
    "No se pudo registrar el cobro. Revise los datos e inténtelo de nuevo.",
  NOT_FOUND:
    "No encontramos la reserva. Vuelva al calendario y ábrala de nuevo.",
  OFFLINE:
    "No hay conexión. El cobro no se registró; inténtelo de nuevo cuando tenga señal.",
  UNCONFIRMED:
    "No pudimos confirmar el cobro. Revise los cobros de la reserva antes de volver a intentarlo.",
  STATUS_CHANGED:
    "La reserva cambió de estado y ya no admite cobros. Vuelva a la reserva y revísela.",
} as const;
