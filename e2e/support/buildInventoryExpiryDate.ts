const DAYS_AHEAD = 10;
const MILLISECONDS_PER_DAY = 86_400_000;
const ISO_DATE_LENGTH = 10;

export const buildInventoryExpiryDate = (): string =>
  new Date(Date.now() + DAYS_AHEAD * MILLISECONDS_PER_DAY)
    .toISOString()
    .slice(0, ISO_DATE_LENGTH);
