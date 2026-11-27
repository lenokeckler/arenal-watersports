import type { ReservationExtraTimeUnavailableReason } from "../models/ReservationExtraTimeUnavailableReason.type";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON as REASON } from "./ReservationExtraTimeUnavailableReason.constants";

export const RESERVATION_EXTRA_TIME_UNAVAILABLE_COPY = {
  BODY: {
    [REASON.CANCELLED]: "La reserva está cancelada.",
    [REASON.GROUPS_OUT]:
      "Todavía hay grupos afuera. El tiempo adicional se calcula contra la hora real de llegada de cada grupo, así que se decide cuando todos regresan.",
    [REASON.NO_EXTRA_TIME]:
      "Todos los grupos regresaron a tiempo: no hay tiempo de más que cobrar.",
    [REASON.RESOLVED]:
      "El tiempo adicional de esta reserva ya se resolvió.",
  } satisfies Record<
    ReservationExtraTimeUnavailableReason,
    string
  >,
  TITLE: "No hay tiempo adicional por decidir",
} as const;
