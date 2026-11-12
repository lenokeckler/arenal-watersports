import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import type { ReservationPostponementReadingErrors } from "../models/ReservationPostponementReadingErrors.interface";

export const resolveReservationPostponementReadingFieldId =
  (
    itemId: string,
    field: keyof ReservationPostponementReadingErrors
  ): string =>
    `${RESERVATION_POSTPONEMENT_FIELD_ID.READING_PREFIX}${field}-${itemId}`;
