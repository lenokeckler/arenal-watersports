import type { ReservationEquipmentAvailability } from "../models/ReservationEquipmentAvailability.interface";

export const RESERVATION_AVAILABILITY = {
  MILLISECONDS_PER_MINUTE: 60_000,
  ERROR: {
    CATEGORY_AVAILABILITY_MISSING:
      "Category interval availability returned no result",
    TIME_ZONE_RESOLUTION_FAILED:
      "Unable to resolve reservation timezone",
  },
  OPERATION: {
    CATEGORY: "check reservation unit category",
    CATEGORY_AVAILABILITY:
      "load category interval availability",
    UNITS: "load available reservation units",
  },
  RPC: {
    CATEGORY_AVAILABILITY: "category_availability",
  },
  RESERVATION_STATUSES: ["dispatched", "scheduled"],
  TIME_ZONE_FORMAT_LOCALE: "en-US",
  TIME_ZONE_NAME_FORMAT: "longOffset",
  TIME_ZONE_NAME_PART: "timeZoneName",
  TIME_ZONE_OFFSET_PATTERN:
    /^GMT(?:([+-])(\d{2}):(\d{2}))?$/,
  UTC_SUFFIX: "Z",
} as const;

export const EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY: ReservationEquipmentAvailability =
  {
    availableQuantity: null,
    availableUnits: [],
  };
