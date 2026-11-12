import { PATHS, STRING } from "@/app/constants";

export const resolveReservationEditPath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.EDIT_SEGMENT,
  ].join(STRING.SLASH);
