import { PATHS, STRING } from "@/app/constants";

export const resolveReservationCancelPath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.CANCEL_SEGMENT,
  ].join(STRING.SLASH);
