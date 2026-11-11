import type { ReactElement } from "react";
import { Text } from "@/app/components";
import { CALENDAR_TEXT } from "@/app/constants";
import type { CalendarMonthGridProps } from "./models/CalendarMonthGridProps.interface";
import { CalendarMonthCell } from "./CalendarMonthCell";
import {
  CALENDAR_GRID_CLASS,
  CALENDAR_WEEKDAY_CLASS,
} from "./styles/Calendar.styles";

export const CalendarMonthGrid = ({
  cells,
  date,
  daySelection,
  monthSelection,
}: CalendarMonthGridProps): ReactElement => (
  <div className={CALENDAR_GRID_CLASS}>
    {CALENDAR_TEXT.WEEKDAYS.map((weekday) => (
      <Text
        key={weekday}
        className={CALENDAR_WEEKDAY_CLASS}
      >
        {weekday}
      </Text>
    ))}
    {cells.map((cell) => (
      <CalendarMonthCell
        key={cell.key}
        cell={cell}
        date={date}
        daySelection={daySelection}
        monthSelection={monthSelection}
      />
    ))}
  </div>
);
