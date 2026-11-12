import { RESERVATION_POSTPONEMENT_LIMITS } from "./ReservationPostponementLimits.constants";

export const RESERVATION_POSTPONEMENT_FEEDBACK_COPY = {
  ACCESS_REQUIRED:
    "No tiene permiso para posponer reservas. Pida acceso a Administración.",
  CAUSE_REQUIRED: "Elija un motivo.",
  CAUSE_WEATHER_ONLY:
    "Una reserva que ya salió solo se pospone por clima: lluvia muy fuerte o tormenta.",
  DATE_REQUIRED: "Elija la nueva fecha.",
  NEW_START_NOT_LATER:
    "La nueva fecha y hora debe ser posterior a la actual. Elija un momento más tarde.",
  NOT_FOUND:
    "No se encontró la reserva. Vuelva al calendario e inténtelo de nuevo.",
  NOT_POSTPONABLE:
    "Esta reserva ya no se puede posponer. Solo se pueden posponer reservas agendadas o ya despachadas.",
  READING_FUEL_REQUIRED: "Elija el nivel de combustible.",
  READING_USAGE_BELOW_DEPARTURE:
    "No puede ser menor que la lectura de salida. Revise el número.",
  READING_USAGE_INVALID: "Escriba un número válido.",
  READING_USAGE_REQUIRED: "Escriba la lectura de regreso.",
  READINGS_REQUIRED:
    "Registre las lecturas de cada unidad e inténtelo de nuevo.",
  REASON_REQUIRED: "Escriba el motivo.",
  REASON_TOO_LONG: `El motivo admite hasta ${RESERVATION_POSTPONEMENT_LIMITS.MAX_REASON_LENGTH} caracteres. Acórtelo e inténtelo de nuevo.`,
  RELOAD_REQUIRED:
    "Los datos de la reserva cambiaron. Recargue la pantalla para ver los datos actuales.",
  SCHEDULE_INVALID: "Elija una fecha y hora válidas.",
  STALE:
    "Esta reserva cambió mientras la revisaba. Recargue la pantalla para ver los datos actuales.",
  SUBMIT_ERROR:
    "No pudimos posponer la reserva. Revise su conexión y vuelva a intentarlo. No se guardó ningún cambio.",
  TIME_REQUIRED: "Elija la nueva hora.",
  UNIT_UNAVAILABLE:
    "El equipo ya no está libre en esa fecha. Elija otra hora u otro día.",
} as const;
