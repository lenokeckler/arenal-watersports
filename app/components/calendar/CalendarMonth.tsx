import type { ReactElement } from "react";
import type { CalendarMonthProps } from "./models/CalendarMonthProps.interface";
import { CalendarMonthGrid } from "./CalendarMonthGrid";
import { CalendarMonthTitle } from "./CalendarMonthTitle";
import { resolveCalendarMonthClass } from "./styles/Calendar.styles";
import { isSameCalendarDate } from "./utils/isSameCalendarDate";

export const CalendarMonth = ({
  title,
  date,
  cells,
  showTitle = true,
  daySelection,
  monthSelection,
}: CalendarMonthProps): ReactElement => (
  <div
    className={resolveCalendarMonthClass(
      isSameCalendarDate(monthSelection?.selectedDate, date)
    )}
  >
    {showTitle && (
      <CalendarMonthTitle
        date={date}
        monthSelection={monthSelection}
        title={title}
      />
    )}
    <CalendarMonthGrid
      cells={cells}
      date={date}
      daySelection={daySelection}
      monthSelection={monthSelection}
    />
  </div>
);
