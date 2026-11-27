import { PATHS, STRING } from "@/app/constants";

export const resolveReservationExtraTimePath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.EXTRA_TIME_SEGMENT,
  ].join(STRING.SLASH);
