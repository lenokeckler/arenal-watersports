import { RESERVATION_CANCELLATION_FIELD_ID } from "./ReservationCancellationUi.constants";
import { RESERVATION_CANCELLATION_CAUSE } from "./ReservationCancellationCause.constants";

export const RESERVATION_CANCELLATION_CAUSE_OPTIONS = [
  {
    description: "El clima obligó a regresar a la gente.",
    id: RESERVATION_CANCELLATION_FIELD_ID.CAUSE_FIRST_OPTION,
    label: "Cambio de clima",
    value: RESERVATION_CANCELLATION_CAUSE.WEATHER,
  },
  {
    description:
      "Algo falló en el agua o con el equipo durante la salida.",
    id: `${RESERVATION_CANCELLATION_FIELD_ID.CAUSE}-${RESERVATION_CANCELLATION_CAUSE.TRIP_PROBLEM}`,
    label: "Problema durante la salida",
    value: RESERVATION_CANCELLATION_CAUSE.TRIP_PROBLEM,
  },
] as const;
