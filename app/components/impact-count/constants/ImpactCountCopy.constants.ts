export const IMPACT_COUNT_COPY = {
  SHORT: (count: number): string => `✕ ${count}`,
  SPOKEN: (count: number): string => `Golpes: ${count}`,
} as const;
