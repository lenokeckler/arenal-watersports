import { PATHS, STRING } from "@/app/constants";

export const resolveReservationChargePath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.CHARGE_SEGMENT,
  ].join(STRING.SLASH);
