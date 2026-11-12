import { PATHS, STRING } from "@/app/constants";

export const resolveReservationPostponePath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.POSTPONE_SEGMENT,
  ].join(STRING.SLASH);
