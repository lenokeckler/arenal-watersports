const INVENTORY_EXPIRY_DATE_FORMAT = {
  locale: "es-CR",
  midnightOffset: "T00:00:00-06:00",
  options: {
    dateStyle: "long",
    timeZone: "America/Costa_Rica",
  },
} as const satisfies {
  locale: string;
  midnightOffset: string;
  options: Intl.DateTimeFormatOptions;
};

export const formatInventoryExpiryDate = (
  expiryDate: string
): string =>
  new Intl.DateTimeFormat(
    INVENTORY_EXPIRY_DATE_FORMAT.locale,
    INVENTORY_EXPIRY_DATE_FORMAT.options
  ).format(
    new Date(
      `${expiryDate}${INVENTORY_EXPIRY_DATE_FORMAT.midnightOffset}`
    )
  );
