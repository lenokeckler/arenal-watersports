import { formatReservationCalendarTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarTime";
import { parseReservationCalendarInstant } from "@/app/components/reservation-calendar/utils/parseReservationCalendarInstant";
import { isSameCostaRicaDay } from "@/app/utils/costa-rica-day/isSameCostaRicaDay";
import { CATEGORY_UNIT_RETURN_DATE_FORMAT } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";

const returnDateFormat = new Intl.DateTimeFormat(
  CATEGORY_UNIT_RETURN_DATE_FORMAT.LOCALE,
  CATEGORY_UNIT_RETURN_DATE_FORMAT.OPTIONS
);

const RETURN_COPY = {
  late: {
    at: CATEGORY_UNITS_COPY.OVERDUE_RETURNS_AT,
    on: CATEGORY_UNITS_COPY.OVERDUE_RETURNS_ON,
  },
  onTime: {
    at: CATEGORY_UNITS_COPY.RETURNS_AT,
    on: CATEGORY_UNITS_COPY.RETURNS_ON,
  },
} as const;

export const formatCategoryUnitReturn = (
  returnsAt: string,
  now: Date,
  isOverdue: boolean
): string => {
  const copy = isOverdue
    ? RETURN_COPY.late
    : RETURN_COPY.onTime;
  const returnInstant = new Date(
    parseReservationCalendarInstant(returnsAt)
  );
  const time = formatReservationCalendarTime(returnsAt);

  if (isSameCostaRicaDay(returnInstant, now)) {
    return copy.at(time);
  }

  return copy.on(
    returnDateFormat.format(returnInstant),
    time
  );
};
