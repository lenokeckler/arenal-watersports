import { STRING, TIME, FORMAT_DATE } from "@/app/constants";

const OFFSET_CR_MS =
  TIME.CR.HOURS_OFFSET *
  TIME.UNITS.MINUTES_IN_HOUR *
  TIME.UNITS.SECONDS_IN_MINUTE *
  TIME.UNITS.MILLISECONDS_IN_SECOND;

export const parseDayMonthYear = (stringDate: string) => {
  const [day, month, year] = stringDate.split(STRING.SLASH);
  return new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day))
  );
};

export const yearMonthDayInCR = (date: Date): string => {
  const cr = new Date(date.getTime() - OFFSET_CR_MS);
  const year = cr.getUTCFullYear();
  const month = String(cr.getUTCMonth() + 1).padStart(
    FORMAT_DATE.PAD_LENGTH,
    FORMAT_DATE.PAD_CHAR
  );
  const day = String(cr.getUTCDate()).padStart(
    FORMAT_DATE.PAD_LENGTH,
    FORMAT_DATE.PAD_CHAR
  );
  return `${year}-${month}-${day}`;
};
