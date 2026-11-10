import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { RESERVATION_POSTPONEMENT_LIMITS } from "../constants/ReservationPostponementLimits.constants";
import type { ReservationPostponementFieldErrors } from "../models/ReservationPostponementFieldErrors.interface";
import type { ReservationPostponementInput } from "../models/ReservationPostponementInput.interface";

const OVERSIZED_REASON = "a".repeat(
  RESERVATION_POSTPONEMENT_LIMITS.MAX_REASON_LENGTH + 1
);
const LIMIT_REASON = "a".repeat(
  RESERVATION_POSTPONEMENT_LIMITS.MAX_REASON_LENGTH
);

export const FIELD_ERROR_CASES: [
  string,
  Partial<ReservationPostponementInput>,
  ReservationPostponementFieldErrors,
][] = [
  [
    "an empty date",
    { date: "" },
    { date: COPY.DATE_REQUIRED },
  ],
  [
    "a malformed date",
    { date: "14/04/2035" },
    { date: COPY.SCHEDULE_INVALID },
  ],
  [
    "an empty time",
    { time: "" },
    { time: COPY.TIME_REQUIRED },
  ],
  [
    "an hour out of range",
    { time: "24:00" },
    { time: COPY.SCHEDULE_INVALID },
  ],
  [
    "a time with seconds",
    { time: "10:30:00" },
    { time: COPY.SCHEDULE_INVALID },
  ],
  [
    "another cause without a reason",
    {
      cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
      reason: "",
    },
    { reason: COPY.REASON_REQUIRED },
  ],
  [
    "another cause with a blank reason",
    {
      cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
      reason: "   ",
    },
    { reason: COPY.REASON_REQUIRED },
  ],
  [
    "another cause with a reason that is too long",
    {
      cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
      reason: OVERSIZED_REASON,
    },
    { reason: COPY.REASON_TOO_LONG },
  ],
];

export const ACCEPTED_CASES: [
  string,
  Partial<ReservationPostponementInput>,
][] = [
  ["a weather cause with no reason", {}],
  [
    "a weather cause ignoring a long reason",
    { reason: OVERSIZED_REASON },
  ],
  [
    "another cause with a reason at the limit",
    {
      cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
      reason: LIMIT_REASON,
    },
  ],
  ["the first minute of the day", { time: "00:00" }],
  ["the last minute of the day", { time: "23:59" }],
];
