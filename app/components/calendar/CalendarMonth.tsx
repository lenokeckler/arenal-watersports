import type { ReactElement } from "react";
import { Text, Title } from "@/app/components";
import {
  CALENDAR_TEXT,
  TitleVariant,
} from "@/app/constants";
import type { CalendarMonthProps } from "./models/CalendarMonthProps.interface";
import {
  CALENDAR_MONTH_CLASS,
  CALENDAR_GRID_CLASS,
  CALENDAR_WEEKDAY_CLASS,
} from "./styles/Calendar.styles";

export const CalendarMonth = ({
  title,
  cells,
  showTitle = true,
}: CalendarMonthProps): ReactElement => (
  <div className={CALENDAR_MONTH_CLASS}>
    {showTitle && (
      <Title
        variant={TitleVariant.AUXILIAR}
        text={title}
      />
    )}
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
        <Text
          key={cell.key}
          className={cell.className}
          aria-label={cell.fullLabel}
          aria-current={cell.current ?? undefined}
        >
          {cell.label}
        </Text>
      ))}
    </div>
  </div>
);
