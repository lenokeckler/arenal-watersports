import { formatReservationCalendarTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarTime";
import { parseReservationCalendarInstant } from "@/app/components/reservation-calendar/utils/parseReservationCalendarInstant";
import { isSameCostaRicaDay } from "@/app/utils/costa-rica-day/isSameCostaRicaDay";
import { CATEGORY_UNIT_RETURN_DATE_FORMAT } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";

const returnDateFormat = new Intl.DateTimeFormat(
  CATEGORY_UNIT_RETURN_DATE_FORMAT.LOCALE,
  CATEGORY_UNIT_RETURN_DATE_FORMAT.OPTIONS
);

export const formatCategoryUnitReturn = (
  returnsAt: string,
  now: Date
): string => {
  const returnInstant = new Date(
    parseReservationCalendarInstant(returnsAt)
  );
  const time = formatReservationCalendarTime(returnsAt);

  if (isSameCostaRicaDay(returnInstant, now)) {
    return CATEGORY_UNITS_COPY.RETURNS_AT(time);
  }

  return CATEGORY_UNITS_COPY.RETURNS_ON(
    returnDateFormat.format(returnInstant),
    time
  );
};
