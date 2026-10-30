import { toCalendarUtcDate } from "@/app/components/calendar/utils/calendarDateArithmetic";
import { RESERVATION_CALENDAR_COVERAGE_ERROR as error } from "../constants/ReservationCalendarCoverage.constants";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";

export const validateReservationCalendarSnapshot = (
  snapshot: ReservationCalendarSnapshot
): void => {
  const coverageStart = toCalendarUtcDate(
    snapshot.startDate
  ).getTime();
  const coverageEnd = toCalendarUtcDate(
    snapshot.endDateExclusive
  ).getTime();
  if (coverageStart >= coverageEnd) {
    throw new RangeError(error.INVALID_COVERAGE, {
      cause: {
        endDateExclusive: snapshot.endDateExclusive,
        startDate: snapshot.startDate,
      },
    });
  }
  if (
    !Number.isSafeInteger(snapshot.totalCount) ||
    snapshot.totalCount < snapshot.entries.length
  ) {
    throw new RangeError(error.INVALID_COUNT, {
      cause: snapshot.totalCount,
    });
  }
  const reservationIds = snapshot.entries.map(
    (entry): string => entry.id
  );
  if (
    new Set(reservationIds).size !== snapshot.entries.length
  ) {
    throw new Error(error.DUPLICATE_RESERVATION, {
      cause: reservationIds,
    });
  }
};
