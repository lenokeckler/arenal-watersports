import type { NullableRef } from "@/app/types";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import type { ReservationPostponementErrors } from "../models/ReservationPostponementErrors.interface";
import type { ReservationPostponementReadingErrors } from "../models/ReservationPostponementReadingErrors.interface";
import { resolveReservationPostponementReadingFieldId } from "./resolveReservationPostponementReadingFieldId";

const FIELD_ORDER = [
  ["date", RESERVATION_POSTPONEMENT_FIELD_ID.DATE],
  ["time", RESERVATION_POSTPONEMENT_FIELD_ID.TIME],
  ["cause", RESERVATION_POSTPONEMENT_FIELD_ID.CAUSE],
  ["reason", RESERVATION_POSTPONEMENT_FIELD_ID.REASON],
] as const;

const READING_ORDER: (keyof ReservationPostponementReadingErrors)[] =
  ["fuelIn", "usageIn"];

const resolveReadingControlId = (
  readings: ReservationPostponementErrors["readings"]
): NullableRef<string> => {
  for (const [itemId, errors] of Object.entries(readings)) {
    const field = READING_ORDER.find((key) => errors[key]);
    if (field) {
      return resolveReservationPostponementReadingFieldId(
        itemId,
        field
      );
    }
  }
  return null;
};

export const resolveReservationPostponementInvalidControlId =
  (
    errors: ReservationPostponementErrors
  ): NullableRef<string> => {
    const field = FIELD_ORDER.find(([key]) => errors[key]);

    return field
      ? field[1]
      : resolveReadingControlId(errors.readings);
  };
