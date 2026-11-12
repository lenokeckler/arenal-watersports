import type { ReservationChargeUnavailableReason } from "../models/ReservationChargeUnavailableReason.type";

export const RESERVATION_CHARGE_UNAVAILABLE_COPY = {
  BODY: {
    cancelled: "La reserva está cancelada.",
    split_child:
      "Esta reserva salió de una división. El cobro queda en la reserva original.",
  } satisfies Record<
    ReservationChargeUnavailableReason,
    string
  >,
  LINK: "Volver a la reserva",
  RULE: "Los cobros se registran en las reservas agendadas, en curso o cerradas.",
  TITLE: "Esta reserva no admite cobros aquí",
} as const;
