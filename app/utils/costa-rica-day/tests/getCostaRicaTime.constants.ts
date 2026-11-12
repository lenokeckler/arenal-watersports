export const TIME_CASES: [string, Date, string][] = [
  [
    "morning",
    new Date("2026-10-28T15:30:00.000Z"),
    "09:30",
  ],
  [
    "midnight",
    new Date("2026-10-28T06:00:00.000Z"),
    "00:00",
  ],
  [
    "evening after UTC midnight",
    new Date("2026-10-29T03:15:00.000Z"),
    "21:15",
  ],
  [
    "last minute of the day",
    new Date("2026-10-29T05:59:59.999Z"),
    "23:59",
  ],
];
