import type { ReservationSplitUnavailableCopy } from "../models/ReservationSplitUnavailableCopy.interface";
import type { ReservationSplitUnavailableReason } from "../models/ReservationSplitUnavailableReason.type";
import { RESERVATION_SPLIT_BLOCK } from "./ReservationSplitBlock.constants";

const NOT_SPLITTABLE_COPY: ReservationSplitUnavailableCopy =
  {
    body: "Para dividirla se necesitan al menos 2 personas y 2 equipos, y esta reserva no los tiene.",
    title: "Esta reserva no se puede dividir",
  };

export const RESERVATION_SPLIT_UNAVAILABLE_COPY: Record<
  ReservationSplitUnavailableReason,
  ReservationSplitUnavailableCopy
> = {
  [RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED]: {
    body: "Solo se pueden dividir las reservas programadas. Esta reserva está en otro estado.",
    title: "Esta reserva ya no se puede dividir",
  },
  [RESERVATION_SPLIT_BLOCK.TOO_FEW_PEOPLE]:
    NOT_SPLITTABLE_COPY,
  [RESERVATION_SPLIT_BLOCK.TOO_LITTLE_EQUIPMENT]:
    NOT_SPLITTABLE_COPY,
};
