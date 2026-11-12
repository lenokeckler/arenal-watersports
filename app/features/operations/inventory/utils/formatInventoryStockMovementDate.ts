const INVENTORY_MOVEMENT_DATE_FORMAT = {
  locale: "es-CR",
  options: {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Costa_Rica",
  },
} as const satisfies {
  locale: string;
  options: Intl.DateTimeFormatOptions;
};

export const formatInventoryStockMovementDate = (
  createdAt: string
): string =>
  new Intl.DateTimeFormat(
    INVENTORY_MOVEMENT_DATE_FORMAT.locale,
    INVENTORY_MOVEMENT_DATE_FORMAT.options
  ).format(new Date(createdAt));
