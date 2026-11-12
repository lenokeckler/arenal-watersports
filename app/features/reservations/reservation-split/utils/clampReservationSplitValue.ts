export const clampReservationSplitValue = (
  value: number,
  minimum: number,
  maximum: number
): number => Math.min(Math.max(value, minimum), maximum);
