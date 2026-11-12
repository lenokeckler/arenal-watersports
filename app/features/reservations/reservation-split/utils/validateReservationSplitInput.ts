import { STRING } from "@/app/constants";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import { RESERVATION_SPLIT_LIMITS } from "../constants/ReservationSplitLimits.constants";
import type { ReservationSplitDepartureErrors } from "../models/ReservationSplitDepartureErrors.interface";
import type { ReservationSplitDepartureInput } from "../models/ReservationSplitDepartureInput.interface";
import type { ReservationSplitErrors } from "../models/ReservationSplitErrors.interface";
import type { ReservationSplitInput } from "../models/ReservationSplitInput.interface";
import type { ReservationSplitItemInput } from "../models/ReservationSplitItemInput.interface";
import { hasReservationSplitErrors } from "./hasReservationSplitErrors";

const isValidPeopleCount = (peopleCount: number): boolean =>
  Number.isInteger(peopleCount) &&
  peopleCount >=
    RESERVATION_SPLIT_LIMITS.MIN_PEOPLE_PER_DEPARTURE;

const isValidItem = (
  item: ReservationSplitItemInput
): boolean =>
  Number.isInteger(item.quantity) &&
  item.quantity >= RESERVATION_SPLIT_LIMITS.MIN_QUANTITY;

const hasDuplicateItem = (
  items: ReservationSplitItemInput[]
): boolean =>
  new Set(items.map((item) => item.itemId)).size !==
  items.length;

const resolveTimeError = (
  time: string
): NullableUndefined<string> => {
  if (time === STRING.Empty) {
    return RESERVATION_SPLIT_FEEDBACK_COPY.TIME_REQUIRED;
  }
  return RESERVATION_SPLIT_LIMITS.TIME_PATTERN.test(time)
    ? undefined
    : RESERVATION_SPLIT_FEEDBACK_COPY.TIME_INVALID;
};

export const validateReservationSplitDeparture = (
  departure: ReservationSplitDepartureInput
): ReservationSplitDepartureErrors => {
  const errors: ReservationSplitDepartureErrors = {};
  const timeError = resolveTimeError(departure.time);

  if (!isValidPeopleCount(departure.peopleCount)) {
    errors.peopleCount =
      RESERVATION_SPLIT_FEEDBACK_COPY.PEOPLE_MIN;
  }
  if (timeError) {
    errors.time = timeError;
  }
  if (
    departure.items.length === 0 ||
    !departure.items.every(isValidItem)
  ) {
    errors.items =
      RESERVATION_SPLIT_FEEDBACK_COPY.EQUIPMENT_MIN;
  }
  if (hasDuplicateItem(departure.items)) {
    errors.items =
      RESERVATION_SPLIT_FEEDBACK_COPY.EQUIPMENT_DUPLICATE;
  }
  return errors;
};

export const validateReservationSplitInput = (
  input: ReservationSplitInput
): NullableRef<ReservationSplitErrors> => {
  if (input.departures.length === 0) {
    return {
      departures: [],
      original:
        RESERVATION_SPLIT_FEEDBACK_COPY.DEPARTURES_MIN,
    };
  }

  const departures = input.departures.map(
    validateReservationSplitDeparture
  );
  const hasErrors = departures.some(
    hasReservationSplitErrors
  );

  return hasErrors ? { departures } : null;
};
