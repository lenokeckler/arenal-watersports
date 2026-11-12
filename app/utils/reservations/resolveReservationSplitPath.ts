import { PATHS, STRING } from "@/app/constants";

export const resolveReservationSplitPath = (
  reservationId: string
): string =>
  [
    PATHS.RESERVATIONS.ROOT,
    reservationId,
    PATHS.RESERVATIONS.SPLIT_SEGMENT,
  ].join(STRING.SLASH);
