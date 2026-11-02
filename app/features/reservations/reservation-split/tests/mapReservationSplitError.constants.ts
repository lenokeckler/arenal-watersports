import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";

export const FORM_ERROR_CASES: [string, string, string][] =
  [
    [
      "a missing reservation",
      "Reservation was not found",
      RESERVATION_SPLIT_FEEDBACK_COPY.NOT_FOUND,
    ],
    [
      "a reservation that is no longer scheduled",
      "Only scheduled reservations can be split",
      RESERVATION_SPLIT_FEEDBACK_COPY.NOT_SCHEDULED,
    ],
    [
      "a stale token",
      "Reservation changed since the form was loaded",
      RESERVATION_SPLIT_FEEDBACK_COPY.STALE,
    ],
    [
      "an unavailable unit",
      "Equipment unit is not available for reservation",
      RESERVATION_SPLIT_FEEDBACK_COPY.UNIT_UNAVAILABLE,
    ],
    [
      "a conflicting unit",
      "Equipment unit conflicts with another reservation",
      RESERVATION_SPLIT_FEEDBACK_COPY.UNIT_UNAVAILABLE,
    ],
    [
      "an unavailable category",
      "Equipment category is not available for reservation",
      RESERVATION_SPLIT_FEEDBACK_COPY.CATEGORY_UNAVAILABLE,
    ],
  ];

export const INVALID_TIME_MESSAGE =
  "A valid reservation date and time are required";
export const UNMAPPED_MESSAGE =
  "Every departure needs equipment";
export const WRAPPED_PREFIX =
  "Supabase query failed: split reservation - ";
export const TWO_DEPARTURES = 2;
