import type { ReactElement } from "react";
import { Button, Text } from "@/app/components";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { CALENDAR_HEAT_LEVEL } from "./constants/CalendarHeatLevel.constants";
import type { CalendarDateSelection } from "./models/CalendarDateSelection.interface";
import type { CalendarMonthCellProps } from "./models/CalendarMonthCellProps.interface";
import { resolveCalendarCellSelectionClass } from "./styles/Calendar.styles";
import { isSameCalendarDate } from "./utils/isSameCalendarDate";

const getCellDaySelection = ({
  cell,
  date,
  daySelection,
  monthSelection,
}: CalendarMonthCellProps):
  CalendarDateSelection | undefined => {
  const isInDisplayedMonth =
    cell.date.year === date.year &&
    cell.date.month === date.month;
  if (monthSelection !== undefined && !isInDisplayedMonth) {
    return undefined;
  }
  return daySelection;
};

export const CalendarMonthCell = (
  props: CalendarMonthCellProps
): ReactElement => {
  const { cell } = props;
  const daySelection = getCellDaySelection(props);
  const selected = isSameCalendarDate(
    daySelection?.selectedDate,
    cell.date
  );
  const heatLevel =
    daySelection?.getHeatLevel(cell.date) ??
    CALENDAR_HEAT_LEVEL.NONE;
  const className = daySelection
    ? resolveCalendarCellSelectionClass(
        cell.className,
        heatLevel,
        selected
      )
    : cell.className;
  if (daySelection === undefined) {
    return (
      <Text
        className={className}
        aria-label={cell.fullLabel}
        aria-current={cell.current ?? undefined}
      >
        {cell.label}
      </Text>
    );
  }
  return (
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.BASE}
      className={className}
      aria-label={cell.fullLabel}
      aria-current={cell.current ?? undefined}
      aria-pressed={selected}
      onClick={() => daySelection.onSelect(cell.date)}
    >
      {cell.label}
    </Button>
  );
};
