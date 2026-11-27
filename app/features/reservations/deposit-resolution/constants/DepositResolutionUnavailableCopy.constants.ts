import type { DepositResolutionUnavailableReason } from "../models/DepositResolutionUnavailableReason.type";

export const DEPOSIT_RESOLUTION_UNAVAILABLE_COPY = {
  BODY: {
    already_resolved:
      "Este depósito ya se resolvió y salió de la lista de pendientes.",
    trip_not_closed:
      "El depósito se resuelve cuando operaciones cierra la salida.",
  } satisfies Record<
    DepositResolutionUnavailableReason,
    string
  >,
  TITLE: {
    already_resolved: "El depósito ya está resuelto",
    trip_not_closed: "La salida todavía no se cerró",
  } satisfies Record<
    DepositResolutionUnavailableReason,
    string
  >,
} as const;
