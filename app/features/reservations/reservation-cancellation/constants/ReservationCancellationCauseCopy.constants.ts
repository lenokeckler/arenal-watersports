import type { ReservationCancellationCause } from "../models/ReservationCancellationCause.type";
import { RESERVATION_CANCELLATION_CAUSE } from "./ReservationCancellationCause.constants";

export const RESERVATION_CANCELLATION_CAUSE_COPY = {
  [RESERVATION_CANCELLATION_CAUSE.WEATHER]: {
    description: "El clima obligó a regresar a la gente.",
    label: "Cambio de clima",
  },
  [RESERVATION_CANCELLATION_CAUSE.TRIP_PROBLEM]: {
    description:
      "Algo falló en el agua o con el equipo durante la salida.",
    label: "Problema durante la salida",
  },
} as const satisfies Record<
  ReservationCancellationCause,
  { description: string; label: string }
>;
