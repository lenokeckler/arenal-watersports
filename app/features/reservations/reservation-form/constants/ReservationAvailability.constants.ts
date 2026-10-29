export const RESERVATION_AVAILABILITY = {
  MILLISECONDS_PER_MINUTE: 60_000,
  ERROR: {
    TIME_ZONE_RESOLUTION_FAILED:
      "Unable to resolve reservation timezone",
  },
  OPERATION: {
    CATEGORY: "check reservation unit category",
    UNITS: "load available reservation units",
  },
  RESERVATION_STATUSES: ["dispatched", "scheduled"],
  TIME_ZONE_FORMAT_LOCALE: "en-US",
  TIME_ZONE_NAME_FORMAT: "longOffset",
  TIME_ZONE_NAME_PART: "timeZoneName",
  TIME_ZONE_OFFSET_PATTERN:
    /^GMT(?:([+-])(\d{2}):(\d{2}))?$/,
  UTC_SUFFIX: "Z",
} as const;
