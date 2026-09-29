import { COSTA_RICA } from "@/app/constants";
import type { CostaRicaDayRange } from "../models/CostaRicaDayRange.interface";

const DATE_TIME_PARTS = {
  DAY: "day",
  HOUR: "hour",
  MINUTE: "minute",
  MONTH: "month",
  SECOND: "second",
  YEAR: "year",
} as const;

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(
  COSTA_RICA.LOCALE,
  {
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone: COSTA_RICA.TIME_ZONE,
    year: "numeric",
  }
);

const getDateParts = (date: Date) => {
  const values = DATE_TIME_FORMATTER.formatToParts(
    date
  ).reduce<Record<string, number>>(
    (result, { type, value }) => ({
      ...result,
      [type]: Number(value),
    }),
    {}
  );

  return {
    day: values[DATE_TIME_PARTS.DAY],
    hour: values[DATE_TIME_PARTS.HOUR],
    minute: values[DATE_TIME_PARTS.MINUTE],
    month: values[DATE_TIME_PARTS.MONTH],
    second: values[DATE_TIME_PARTS.SECOND],
    year: values[DATE_TIME_PARTS.YEAR],
  };
};

const localMidnightToUtc = (
  year: number,
  month: number,
  day: number
): Date => {
  const localDateAsUtc = Date.UTC(year, month - 1, day);
  const firstOffsetParts = getDateParts(
    new Date(localDateAsUtc)
  );
  const firstOffset =
    Date.UTC(
      firstOffsetParts.year,
      firstOffsetParts.month - 1,
      firstOffsetParts.day,
      firstOffsetParts.hour,
      firstOffsetParts.minute,
      firstOffsetParts.second
    ) - localDateAsUtc;
  const adjustedDate = new Date(
    localDateAsUtc - firstOffset
  );
  const adjustedParts = getDateParts(adjustedDate);
  const adjustedOffset =
    Date.UTC(
      adjustedParts.year,
      adjustedParts.month - 1,
      adjustedParts.day,
      adjustedParts.hour,
      adjustedParts.minute,
      adjustedParts.second
    ) - adjustedDate.getTime();

  return new Date(localDateAsUtc - adjustedOffset);
};

export const getCostaRicaDayRange = (
  currentDate: Date
): CostaRicaDayRange => {
  const { day, month, year } = getDateParts(currentDate);
  const tomorrow = new Date(
    Date.UTC(year, month - 1, day + 1)
  );

  return {
    startsAt: localMidnightToUtc(
      year,
      month,
      day
    ).toISOString(),
    endsAt: localMidnightToUtc(
      tomorrow.getUTCFullYear(),
      tomorrow.getUTCMonth() + 1,
      tomorrow.getUTCDate()
    ).toISOString(),
  };
};
