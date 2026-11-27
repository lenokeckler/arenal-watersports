import { PATHS, STRING } from "@/app/constants";

export const resolveReservationRefundPath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.REFUND_SEGMENT,
  ].join(STRING.SLASH);
