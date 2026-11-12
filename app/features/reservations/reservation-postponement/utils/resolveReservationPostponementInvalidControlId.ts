import type { NullableRef } from "@/app/types";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import type { ReservationPostponementErrors } from "../models/ReservationPostponementErrors.interface";

const FIELD_ORDER = [
  ["date", RESERVATION_POSTPONEMENT_FIELD_ID.DATE],
  ["time", RESERVATION_POSTPONEMENT_FIELD_ID.TIME],
  ["cause", RESERVATION_POSTPONEMENT_FIELD_ID.CAUSE],
  ["reason", RESERVATION_POSTPONEMENT_FIELD_ID.REASON],
] as const;

export const resolveReservationPostponementInvalidControlId =
  (
    errors: ReservationPostponementErrors
  ): NullableRef<string> => {
    const field = FIELD_ORDER.find(([key]) => errors[key]);

    return field ? field[1] : null;
  };
