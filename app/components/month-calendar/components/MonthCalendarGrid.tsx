import InlineText from "@/app/components/text/InlineText";
import { countLeadingBlanks } from "@/app/utils/equipment-months/buildMonthDays";
import { MONTH_CALENDAR_COPY } from "../constants/MonthCalendarCopy.constants";
import type { MonthCalendarGridProps } from "../models/MonthCalendarGridProps.interface";
import {
  CALENDAR_GRID_CLASS,
  CALENDAR_WEEKDAY_CLASS,
} from "../styles/MonthCalendar.styles";
import MonthCalendarCell from "./MonthCalendarCell";
import type { JSX } from "react";

const MonthCalendarGrid = ({
  days,
  month,
}: MonthCalendarGridProps): JSX.Element => (
  <div className={CALENDAR_GRID_CLASS}>
    {MONTH_CALENDAR_COPY.WEEKDAYS.map((weekday) => (
      <InlineText
        key={weekday}
        className={CALENDAR_WEEKDAY_CLASS}
      >
        {weekday}
      </InlineText>
    ))}
    {Array.from(
      { length: countLeadingBlanks(month) },
      (_, index) => (
        <InlineText
          key={index}
          aria-hidden
        >
          {null}
        </InlineText>
      )
    )}
    {days.map((cell) => (
      <MonthCalendarCell
        key={cell.isoDate}
        cell={cell}
      />
    ))}
  </div>
);

export default MonthCalendarGrid;
