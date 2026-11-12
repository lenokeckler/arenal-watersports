import { ISO_DATE_PATTERN, STRING } from "@/app/constants";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { RESERVATION_POSTPONEMENT_LIMITS } from "../constants/ReservationPostponementLimits.constants";
import type { ReservationPostponementErrors } from "../models/ReservationPostponementErrors.interface";
import type { ReservationPostponementFieldErrors } from "../models/ReservationPostponementFieldErrors.interface";
import type { ReservationPostponementScheduleFields } from "../models/ReservationPostponementScheduleFields.type";
import { isReservationPostponementCalendarDate } from "./isReservationPostponementCalendarDate";

const resolveDateError = (
  date: string
): NullableUndefined<string> => {
  if (date === STRING.Empty) {
    return RESERVATION_POSTPONEMENT_FEEDBACK_COPY.DATE_REQUIRED;
  }
  return ISO_DATE_PATTERN.test(date) &&
    isReservationPostponementCalendarDate(date)
    ? undefined
    : RESERVATION_POSTPONEMENT_FEEDBACK_COPY.SCHEDULE_INVALID;
};

const resolveTimeError = (
  time: string
): NullableUndefined<string> => {
  if (time === STRING.Empty) {
    return RESERVATION_POSTPONEMENT_FEEDBACK_COPY.TIME_REQUIRED;
  }
  return RESERVATION_POSTPONEMENT_LIMITS.TIME_PATTERN.test(
    time
  )
    ? undefined
    : RESERVATION_POSTPONEMENT_FEEDBACK_COPY.SCHEDULE_INVALID;
};

const resolveReasonError = ({
  cause,
  reason,
}: ReservationPostponementScheduleFields): NullableUndefined<string> => {
  if (cause !== RESERVATION_POSTPONEMENT_CAUSE.OTHER) {
    return undefined;
  }
  const trimmed = reason.trim();
  if (trimmed === STRING.Empty) {
    return RESERVATION_POSTPONEMENT_FEEDBACK_COPY.REASON_REQUIRED;
  }
  return [...trimmed].length >
    RESERVATION_POSTPONEMENT_LIMITS.MAX_REASON_LENGTH
    ? RESERVATION_POSTPONEMENT_FEEDBACK_COPY.REASON_TOO_LONG
    : undefined;
};

export const validateReservationPostponementInput = (
  input: ReservationPostponementScheduleFields
): NullableRef<ReservationPostponementErrors> => {
  const fieldErrors: ReservationPostponementFieldErrors = {
    date: resolveDateError(input.date),
    reason: resolveReasonError(input),
    time: resolveTimeError(input.time),
  };
  const hasErrors =
    Object.values(fieldErrors).some(Boolean);

  return hasErrors
    ? { ...fieldErrors, readings: {} }
    : null;
};
