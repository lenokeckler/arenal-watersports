import type { ReservationDepositUnavailableReason } from "../models/ReservationDepositUnavailableReason.type";

export const RESERVATION_DEPOSIT_UNAVAILABLE_COPY = {
  BODY: {
    already_decided:
      "Ya se registró si hubo depósito en esta reserva. Puede verlo en el detalle de la reserva.",
    not_depositable:
      "El depósito solo se registra en reservas agendadas o en curso.",
    split_child:
      "Esta reserva salió de una división. El depósito queda en la reserva original.",
  } satisfies Record<
    ReservationDepositUnavailableReason,
    string
  >,
  TITLE: {
    already_decided: "El depósito ya está registrado",
    not_depositable: "Esta reserva no admite depósito",
    split_child: "El depósito está en la reserva original",
  } satisfies Record<
    ReservationDepositUnavailableReason,
    string
  >,
} as const;
