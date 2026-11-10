import { ISO_DATE_UTC_MIDNIGHT_SUFFIX } from "@/app/constants";

export const isReservationPostponementCalendarDate = (
  date: string
): boolean => {
  const parsed = new Date(
    `${date}${ISO_DATE_UTC_MIDNIGHT_SUFFIX}`
  );
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().startsWith(date)
  );
};
