export const FORMAT_INSTANTS = {
  AFTERNOON: "2026-10-31T20:35:00Z",
  AT_COSTA_RICA_MIDNIGHT: "2026-10-31T06:00:00Z",
  BEFORE_COSTA_RICA_MIDNIGHT: "2026-10-31T05:59:59Z",
} as const;

export const FORMAT_EXPECTED = {
  AFTERNOON_DATE: "31 oct 2026",
  AT_MIDNIGHT_DATE: "31 oct 2026",
  BEFORE_MIDNIGHT_DATE: "30 oct 2026",
} as const;

export const FORMAT_PROCESS_ZONES = [
  "UTC",
  "Asia/Tokyo",
  "Pacific/Kiritimati",
] as const;
