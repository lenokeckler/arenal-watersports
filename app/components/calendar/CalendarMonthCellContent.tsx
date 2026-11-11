import type { ReactElement } from "react";
import { Button, InlineText, Text } from "@/app/components";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import type { CalendarDateSelection } from "./models/CalendarDateSelection.interface";
import type { CalendarCell } from "./models/CalendarCell.interface";
import {
  resolveCalendarCellSelectionClass,
  resolveCalendarHeatCountClass,
} from "./styles/Calendar.styles";

interface CalendarMonthCellContentProps {
  cell: CalendarCell;
  daySelection: CalendarDateSelection;
}

export const CalendarMonthCellContent = ({
  cell,
  daySelection,
}: CalendarMonthCellContentProps): ReactElement => {
  const selected =
    daySelection.selectedDate?.year === cell.date.year &&
    daySelection.selectedDate?.month === cell.date.month &&
    daySelection.selectedDate?.day === cell.date.day;
  const heatLevel = daySelection.getHeatLevel(cell.date);
  const reservationCount = daySelection.getCount(cell.date);
  const accessibleLabel =
    reservationCount === undefined
      ? cell.fullLabel
      : daySelection.getAccessibleLabel(
          cell.fullLabel,
          reservationCount
        );
  const className = resolveCalendarCellSelectionClass(
    cell.className,
    heatLevel,
    selected
  );
  return (
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.BASE}
      className={className}
      aria-label={accessibleLabel}
      aria-current={cell.current ?? undefined}
      aria-pressed={selected}
      onClick={() => daySelection.onSelect(cell.date)}
    >
      {cell.label}
      {reservationCount !== undefined &&
        reservationCount > 0 && (
          <InlineText
            aria-hidden="true"
            className={resolveCalendarHeatCountClass(
              heatLevel
            )}
          >
            {reservationCount}
          </InlineText>
        )}
    </Button>
  );
};

export const CalendarMonthCellOutside = ({
  cell,
}: Pick<
  CalendarMonthCellContentProps,
  "cell"
>): ReactElement => (
  <Text
    className={cell.className}
    aria-label={cell.fullLabel}
    aria-current={cell.current ?? undefined}
  >
    {cell.label}
  </Text>
);
