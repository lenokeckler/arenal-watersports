import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitRemainder } from "../models/ReservationSplitRemainder.interface";
import type { ReservationSplitSummaryRow } from "../models/ReservationSplitSummaryRow.interface";
import { formatReservationSplitDate } from "./formatReservationSplitDate";
import { formatReservationSplitDuration } from "./formatReservationSplitDuration";

export const buildReservationSplitSummaryRows = (
  split: ReservationSplit,
  remainder: ReservationSplitRemainder
): ReservationSplitSummaryRow[] => [
  {
    term: RESERVATION_SPLIT_UI_COPY.LABEL_CUSTOMER,
    value: split.customerName,
  },
  {
    term: RESERVATION_SPLIT_UI_COPY.LABEL_DATE,
    value: formatReservationSplitDate(split.date),
  },
  {
    hint: RESERVATION_SPLIT_UI_COPY.ORIGINAL_TIME_HINT,
    term: RESERVATION_SPLIT_UI_COPY.LABEL_START_TIME,
    value: split.time,
  },
  {
    term: RESERVATION_SPLIT_UI_COPY.LABEL_DURATION,
    value: formatReservationSplitDuration(
      split.durationMinutes
    ),
  },
  {
    hint: RESERVATION_SPLIT_UI_COPY.ORIGINAL_STAYS,
    isAtMinimum:
      remainder.peopleCount <=
      RESERVATION_SPLIT_DRAFT.MIN_PEOPLE,
    term: RESERVATION_SPLIT_UI_COPY.LABEL_PEOPLE,
    value: RESERVATION_SPLIT_UI_COPY.REMAINING_OF(
      remainder.peopleCount,
      split.peopleCount
    ),
  },
];
