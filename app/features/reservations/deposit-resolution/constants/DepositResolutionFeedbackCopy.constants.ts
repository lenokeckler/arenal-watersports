export const DEPOSIT_RESOLUTION_FEEDBACK_COPY = {
  ALREADY_RESOLVED:
    "Este depósito ya fue resuelto. Vuelva a la lista de pendientes.",
  FORBIDDEN: "No tiene permiso para resolver depósitos.",
  GENERIC:
    "No se pudo resolver el depósito. Revise su conexión e intente de nuevo.",
  NOT_FOUND:
    "No encontramos el depósito. Vuelva a la lista de pendientes y ábralo de nuevo.",
  OFFLINE:
    "No hay conexión. El depósito no se resolvió; inténtelo de nuevo cuando tenga señal.",
  REQUEST_REJECTED:
    "No se pudo resolver el depósito. Vuelva a abrirlo e intente de nuevo.",
  TRIP_NOT_CLOSED:
    "La salida todavía no se cerró. El depósito se resuelve cuando operaciones la cierra.",
  UNCONFIRMED:
    "No pudimos confirmar la resolución. Revise la lista de pendientes antes de volver a intentarlo.",
} as const;
