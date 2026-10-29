import {
  RESERVATION_CALENDAR_QUERY_ERROR,
  RESERVATION_CALENDAR_WINDOW_FORMAT as format,
  STRING,
} from "@/app/constants";

export const normalizeReservationCalendarInstant = (
  instant: string
): string => {
  const prefix = instant.slice(
    0,
    format.CIVIL_PREFIX_LENGTH
  );
  const civil = new Date(`${prefix}${format.UTC_SUFFIX}`);
  const timestamp = Date.parse(instant);
  const normalizedInstant = Number.isFinite(timestamp)
    ? new Date(timestamp).toISOString()
    : STRING.Empty;
  if (
    !format.INSTANT_PATTERN.test(instant) ||
    !format.INSTANT_PATTERN.test(normalizedInstant) ||
    !Number.isFinite(timestamp) ||
    !Number.isFinite(civil.getTime()) ||
    civil
      .toISOString()
      .slice(0, format.CIVIL_PREFIX_LENGTH) !== prefix
  ) {
    throw new Error(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_WINDOW,
      { cause: instant }
    );
  }
  return normalizedInstant;
};
