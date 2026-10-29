import type { ReactElement } from "react";
import { Text } from "@/app/components";
import type { CalendarDaysProps } from "./models/CalendarDaysProps.interface";
import { CALENDAR_DAY_CLASS } from "./styles/Calendar.styles";

export const CalendarDays = ({
  cells,
  className,
  dayContent,
}: CalendarDaysProps): ReactElement => (
  <div className={className}>
    {cells.map((cell) => (
      <div
        key={cell.key}
        className={CALENDAR_DAY_CLASS}
      >
        <Text
          aria-current={cell.current ?? undefined}
          className={cell.className}
        >
          {cell.fullLabel}
        </Text>
        {dayContent?.(cell.date)}
      </div>
    ))}
  </div>
);
