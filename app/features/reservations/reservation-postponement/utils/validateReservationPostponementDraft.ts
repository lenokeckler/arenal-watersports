import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementDraft } from "../models/ReservationPostponementDraft.interface";
import type { ReservationPostponementErrors } from "../models/ReservationPostponementErrors.interface";
import { resolveReservationPostponementReadingErrors } from "./resolveReservationPostponementReadingErrors";
import { validateReservationPostponementInput } from "./validateReservationPostponementInput";

const EMPTY_READING = {
  fuelIn: STRING.Empty,
  usageIn: STRING.Empty,
};

export const validateReservationPostponementDraft = (
  postponement: ReservationPostponement,
  draft: ReservationPostponementDraft
): NullableRef<ReservationPostponementErrors> => {
  const scheduleErrors =
    validateReservationPostponementInput(draft);
  const readings = Object.fromEntries(
    postponement.readingUnits
      .map(
        (unit) =>
          [
            unit.itemId,
            resolveReservationPostponementReadingErrors(
              unit,
              draft.readings[unit.itemId] ?? EMPTY_READING
            ),
          ] as const
      )
      .filter(
        ([, errors]) => Object.keys(errors).length > 0
      )
  );
  const cause =
    draft.cause === null ? COPY.CAUSE_REQUIRED : undefined;
  const hasErrors =
    scheduleErrors !== null ||
    cause !== undefined ||
    Object.keys(readings).length > 0;

  return hasErrors
    ? {
        ...scheduleErrors,
        ...(cause && { cause }),
        readings,
      }
    : null;
};
