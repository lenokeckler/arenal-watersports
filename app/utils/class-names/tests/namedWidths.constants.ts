export const SOURCE_ROOT = "app";

export const SOURCE_SCAN_TIMEOUT_MS = 30_000;

export const SOURCE_FILE_PATTERN = /\.tsx?$/;

export const NAMED_WIDTH_PATTERN =
  /(?<![-\w])(?:min-|max-)?w-(?:xs|sm|md|lg|xl)(?![-\w])/;

export const KNOWN_NAMED_WIDTH_FILES = [
  "app/features/reservations/reservation-detail/styles/ReservationDetail.styles.ts",
];
