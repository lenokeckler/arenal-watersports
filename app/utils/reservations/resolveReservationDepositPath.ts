import { PATHS, STRING } from "@/app/constants";

export const resolveReservationDepositPath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.DEPOSIT_SEGMENT,
  ].join(STRING.SLASH);
