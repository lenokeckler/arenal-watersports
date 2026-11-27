import {
  RESERVATION_DETAIL_TIMESTAMP,
  RESERVATION_DETAIL_TIMESTAMP_PATTERN,
} from "../constants/ReservationDetailTimestamp.constants";

const normalizeOffset = (offset: string): string =>
  offset.length ===
  RESERVATION_DETAIL_TIMESTAMP.SHORT_OFFSET_LENGTH
    ? `${offset}${RESERVATION_DETAIL_TIMESTAMP.MINUTES_SUFFIX}`
    : offset;

export const parseReservationDetailTimestampMicroseconds = (
  timestamp: string
): number => {
  const parts =
    RESERVATION_DETAIL_TIMESTAMP_PATTERN.exec(timestamp);

  if (!parts) {
    return (
      Date.parse(timestamp) *
      RESERVATION_DETAIL_TIMESTAMP.MICROSECONDS_PER_MILLISECOND
    );
  }

  const [, seconds, fraction = "", offset] = parts;
  const paddedFraction = fraction
    .padEnd(
      RESERVATION_DETAIL_TIMESTAMP.FRACTION_DIGITS,
      RESERVATION_DETAIL_TIMESTAMP.FRACTION_PAD
    )
    .slice(0, RESERVATION_DETAIL_TIMESTAMP.FRACTION_DIGITS);
  const milliseconds = Date.parse(
    `${seconds}${normalizeOffset(offset)}`
  );

  return (
    milliseconds *
      RESERVATION_DETAIL_TIMESTAMP.MICROSECONDS_PER_MILLISECOND +
    Number(paddedFraction)
  );
};
