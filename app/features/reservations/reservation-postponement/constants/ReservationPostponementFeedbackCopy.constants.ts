import { RESERVATION_POSTPONEMENT_LIMITS } from "./ReservationPostponementLimits.constants";

export const RESERVATION_POSTPONEMENT_FEEDBACK_COPY = {
  DATE_REQUIRED: "Elija la nueva fecha.",
  REASON_REQUIRED: "Escriba el motivo.",
  REASON_TOO_LONG: `El motivo admite hasta ${RESERVATION_POSTPONEMENT_LIMITS.MAX_REASON_LENGTH} caracteres. Acórtelo e inténtelo de nuevo.`,
  SCHEDULE_INVALID: "Elija una fecha y hora válidas.",
  TIME_REQUIRED: "Elija la nueva hora.",
} as const;
