import { RESERVATION_CANCELLATION_LIMITS } from "./ReservationCancellationLimits.constants";

export const RESERVATION_CANCELLATION_FEEDBACK_COPY = {
  ACCESS_REQUIRED:
    "No tiene permiso para cancelar reservas. Pida acceso a Administración.",
  CAUSE_INVALID:
    "La causa elegida no es válida. Elija una de las dos opciones e inténtelo de nuevo.",
  CAUSE_REQUIRED:
    "Elija la causa de la cancelación. Sirve para saber por qué se cortó la salida.",
  NOT_CANCELLABLE:
    "Esta reserva ya no se puede cancelar desde aquí. Solo se cancelan así las reservas agendadas o con la salida en curso.",
  NOT_FOUND:
    "No se encontró la reserva. Vuelva al calendario e inténtelo de nuevo.",
  REASON_REQUIRED:
    "Escriba el motivo. Sirve para revisar después por qué se cae la gente.",
  REASON_TOO_LONG: `El motivo admite hasta ${RESERVATION_CANCELLATION_LIMITS.MAX_REASON_LENGTH} caracteres. Acórtelo e inténtelo de nuevo.`,
  STALE:
    "Esta reserva cambió mientras la revisaba. Recargue la pantalla para ver los datos actuales.",
  SUBMIT_ERROR:
    "No pudimos cancelar la reserva. Revise su conexión y vuelva a intentarlo. No se guardó ningún cambio.",
} as const;
