import type { ReservationRefundReason } from "../models/ReservationRefundReason.type";
import { RESERVATION_REFUND_REASON } from "./ReservationRefundReason.constants";

export const RESERVATION_REFUND_REASON_COPY = {
  [RESERVATION_REFUND_REASON.CANCELLED_TRIP]:
    "Salida cancelada",
  [RESERVATION_REFUND_REASON.CUT_SHORT_TRIP]:
    "Salida cortada a medias",
  [RESERVATION_REFUND_REASON.OTHER]: "Otro",
} as const satisfies Record<
  ReservationRefundReason,
  string
>;
