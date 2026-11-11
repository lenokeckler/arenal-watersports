import { STRING, TIME } from "@/app/constants";
import { RESERVATION_TIME_ZONE } from "../constants/ReservationFormUi.constants";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

const getTimeZoneOffset = (date: Date): number => {
  const formatter = new Intl.DateTimeFormat(
    RESERVATION_AVAILABILITY.TIME_ZONE_FORMAT_LOCALE,
    {
      timeZone: RESERVATION_TIME_ZONE,
      timeZoneName:
        RESERVATION_AVAILABILITY.TIME_ZONE_NAME_FORMAT,
    }
  );
  const offsetText = formatter
    .formatToParts(date)
    .find(
      (part) =>
        part.type ===
        RESERVATION_AVAILABILITY.TIME_ZONE_NAME_PART
    )?.value;
  const offsetMatch =
    RESERVATION_AVAILABILITY.TIME_ZONE_OFFSET_PATTERN.exec(
      offsetText ?? STRING.Empty
    );

  if (!offsetMatch) {
    throw new Error(
      RESERVATION_AVAILABILITY.ERROR
        .TIME_ZONE_RESOLUTION_FAILED
    );
  }

  const [, direction, hoursText, minutesText] = offsetMatch;
  if (!direction || !hoursText || !minutesText) {
    return 0;
  }

  const offsetMinutes =
    Number(hoursText) * TIME.UNITS.MINUTES_IN_HOUR +
    Number(minutesText);
  return (
    (direction === "+" ? 1 : -1) *
    offsetMinutes *
    RESERVATION_AVAILABILITY.MILLISECONDS_PER_MINUTE
  );
};

export const getReservationWindow = (
  input: ReservationUnitAvailabilityInput
) => {
  const wallTimeAsUtc = new Date(
    `${input.date}T${input.time}:00${RESERVATION_AVAILABILITY.UTC_SUFFIX}`
  );
  const startsAt = new Date(
    wallTimeAsUtc.getTime() -
      getTimeZoneOffset(wallTimeAsUtc)
  );
  const endsAt = new Date(
    startsAt.getTime() +
      input.durationMinutes *
        RESERVATION_AVAILABILITY.MILLISECONDS_PER_MINUTE
  );

  return {
    endsAt: endsAt.toISOString(),
    startsAt: startsAt.toISOString(),
  };
};
