export const OIL_REMAINING_COPY = {
  LABEL: "Necesita cambio de aceite",
  PAST_SIGN: "−",
  UNIT: {
    engine_hours: " h",
    kilometers: " km",
  },
} as const;

export const OIL_REMAINING_FORMAT = {
  LOCALE: "es-CR",
  OPTIONS: { maximumFractionDigits: 1 },
} as const;
