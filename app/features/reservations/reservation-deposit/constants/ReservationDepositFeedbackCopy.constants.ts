export const RESERVATION_DEPOSIT_FEEDBACK_COPY = {
  ALREADY_DECIDED:
    "Esta reserva ya tiene registrada su decisión sobre el depósito. Vuelva a la reserva para verla.",
  FORBIDDEN: "No tiene permiso para registrar depósitos.",
  GENERIC:
    "No se pudo registrar el depósito. Revise su conexión e intente de nuevo.",
  NOT_DEPOSITABLE:
    "Esta reserva ya no admite registrar un depósito.",
  NOT_FOUND:
    "No encontramos la reserva. Vuelva al calendario y ábrala de nuevo.",
  OFFLINE:
    "No hay conexión. El depósito no se registró; inténtelo de nuevo cuando tenga señal.",
  REQUEST_REJECTED:
    "No se pudo registrar el depósito. Vuelva a abrir el depósito e intente de nuevo.",
  SPLIT_CHILD:
    "Esta reserva salió de una división. El depósito queda en la reserva original.",
  UNCONFIRMED:
    "No pudimos confirmar el depósito. Revise la reserva antes de volver a intentarlo.",
} as const;
