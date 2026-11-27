import { EQUIPMENT_PERIOD } from "@/app/constants";

const toNoon = (isoDate: string): Date =>
  new Date(`${isoDate}${EQUIPMENT_PERIOD.NOON_SUFFIX}`);

const capitalize = (text: string): string =>
  `${text.charAt(0).toLocaleUpperCase(EQUIPMENT_PERIOD.LOCALE)}${text.slice(1)}`;

const format = (
  isoDate: string,
  options: Intl.DateTimeFormatOptions
): string =>
  new Intl.DateTimeFormat(EQUIPMENT_PERIOD.LOCALE, {
    ...options,
    timeZone: "UTC",
  }).format(toNoon(isoDate));

const firstDay = (monthKey: string): string =>
  `${monthKey}${EQUIPMENT_PERIOD.FIRST_DAY_SUFFIX}`;

export const formatMonthName = (monthKey: string): string =>
  capitalize(
    `${format(firstDay(monthKey), { month: "long" })} ${format(firstDay(monthKey), { year: "numeric" })}`
  );

export const formatShortMonth = (
  monthKey: string
): string =>
  capitalize(
    format(firstDay(monthKey), { month: "short" }).replace(
      ".",
      ""
    )
  );

export const formatShortDay = (isoDate: string): string =>
  format(isoDate, {
    day: "numeric",
    month: "short",
  }).replace(".", "");

export const formatLongDay = (isoDate: string): string =>
  capitalize(
    format(isoDate, {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  );
