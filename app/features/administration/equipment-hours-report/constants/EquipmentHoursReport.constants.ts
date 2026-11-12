export const EQUIPMENT_HOURS_ERROR = {
  LOAD_CATEGORIES: "load the categories of the usage hours",
  LOAD_HOURS: "load the usage hours of the equipment",
  NOT_ADMINISTRATOR: "The worker is not an administrator.",
} as const;

export const EQUIPMENT_HOURS_LIMITS = {
  CATEGORIES_PER_PAGE: 3,
  UNITS_MAX: 200,
} as const;

export const EQUIPMENT_HOURS_FORMAT = {
  dateOptions: {
    dateStyle: "medium",
    timeZone: "America/Costa_Rica",
  },
  hoursOptions: { maximumFractionDigits: 1 },
  locale: "es-CR",
} as const satisfies {
  dateOptions: Intl.DateTimeFormatOptions;
  hoursOptions: Intl.NumberFormatOptions;
  locale: string;
};
