import { STRING } from "@/app/constants";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { RESERVATION_TIME_ZONE } from "../constants/ReservationFormUi.constants";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getReservationInterval } from "./getReservationInterval";
import { isReservationUnitAvailabilityInput } from "./isReservationUnitAvailabilityInput";

export const getReservationIntervalLabel = (
  input: ReservationUnitAvailabilityInput
): string => {
  if (!isReservationUnitAvailabilityInput(input)) {
    return STRING.Empty;
  }

  const interval = getReservationInterval(input);
  const dateFormatter = new Intl.DateTimeFormat(
    RESERVATION_AVAILABILITY.LOCALE,
    {
      day: RESERVATION_AVAILABILITY.DATE_FORMAT.DAY,
      month: RESERVATION_AVAILABILITY.DATE_FORMAT.MONTH,
      timeZone: RESERVATION_TIME_ZONE,
      weekday: RESERVATION_AVAILABILITY.DATE_FORMAT.WEEKDAY,
      year: RESERVATION_AVAILABILITY.DATE_FORMAT.YEAR,
    }
  );
  const timeFormatter = new Intl.DateTimeFormat(
    RESERVATION_AVAILABILITY.LOCALE,
    {
      hour: RESERVATION_AVAILABILITY.TIME_FORMAT.HOUR,
      minute: RESERVATION_AVAILABILITY.TIME_FORMAT.MINUTE,
      timeZone: RESERVATION_TIME_ZONE,
    }
  );
  const startsAt = new Date(interval.startsAt);
  const endsAt = new Date(interval.endsAt);

  const startDateLabel = dateFormatter.format(startsAt);
  const endDateLabel = dateFormatter.format(endsAt);
  const dateLabel =
    startDateLabel === endDateLabel
      ? startDateLabel
      : `${startDateLabel}–${endDateLabel}`;

  return `${dateLabel} · ${timeFormatter.format(startsAt)}–${timeFormatter.format(endsAt)}`;
};
