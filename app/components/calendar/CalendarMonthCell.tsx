import type { ReactElement } from "react";
import type { NullableUndefined } from "@/app/types";
import type { CalendarDateSelection } from "./models/CalendarDateSelection.interface";
import type { CalendarMonthCellProps } from "./models/CalendarMonthCellProps.interface";
import {
  CalendarMonthCellContent,
  CalendarMonthCellOutside,
} from "./CalendarMonthCellContent";

const getCellDaySelection = ({
  cell,
  date,
  daySelection,
  monthSelection,
}: CalendarMonthCellProps): NullableUndefined<CalendarDateSelection> => {
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
  if (daySelection === undefined) {
    return <CalendarMonthCellOutside cell={cell} />;
  }
  return (
    <CalendarMonthCellContent
      cell={cell}
      daySelection={daySelection}
    />
  );
};
