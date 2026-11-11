"use client";

import type { ReactElement } from "react";
import type { NullableRef } from "@/app/types";
import { Section, Text } from "@/app/components";
import {
  CALENDAR_PRESENTATION,
  CALENDAR_TEXT,
  ARIA_ROLE,
  CALENDAR_VIEW,
} from "@/app/constants";
import type { CalendarViewProps } from "./models/CalendarViewProps.interface";
import { useCalendarViewModel } from "./hooks/useCalendarViewModel";
import { CalendarToolbar } from "./CalendarToolbar";
import { CalendarDays } from "./CalendarDays";
import { CalendarMonth } from "./CalendarMonth";
import type { CalendarPeriodsProps } from "./models/CalendarPeriodsProps.interface";
import {
  CALENDAR_ROOT_CLASS,
  CALENDAR_ERROR_CLASS,
  CALENDAR_YEAR_CLASS,
} from "./styles/Calendar.styles";

const CalendarPeriods = ({
  calendar,
  dayContent,
  selection,
}: CalendarPeriodsProps): ReactElement => {
  if (calendar.selectedView === CALENDAR_VIEW.YEAR) {
    return (
      <div className={CALENDAR_YEAR_CLASS}>
        {calendar.months.map((month) => (
          <CalendarMonth
            key={month.title}
            {...month}
            daySelection={selection?.day}
            monthSelection={selection?.month}
          />
        ))}
      </div>
    );
  }
  if (calendar.selectedView === CALENDAR_VIEW.MONTH) {
    return (
      <CalendarMonth
        showTitle={false}
        title={calendar.toolbar.title}
        date={calendar.period.start}
        cells={calendar.days}
        daySelection={selection?.day}
      />
    );
  }
  return (
    <CalendarDays
      className={calendar.daysClassName}
      cells={calendar.days}
      dayContent={dayContent}
    />
  );
};

export const CalendarView = (
  props: CalendarViewProps
): NullableRef<ReactElement> => {
  const calendar = useCalendarViewModel(props);
  if (!calendar.hasAccess) {
    return null;
  }
  return (
    <Section
      ariaLabel={CALENDAR_PRESENTATION.TITLE_ID}
      className={CALENDAR_ROOT_CLASS}
    >
      <CalendarToolbar {...calendar.toolbar} />
      {calendar.preferenceError && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={CALENDAR_ERROR_CLASS}
        >
          {calendar.preferenceError}
        </Text>
      )}
      <Section
        role={ARIA_ROLE.GROUP}
        aria-label={CALENDAR_TEXT.PERIOD_CONTENT}
      >
        <CalendarPeriods
          calendar={calendar}
          dayContent={props.dayContent}
          selection={props.selection}
        />
      </Section>
      {props.periodContent?.(calendar.period)}
    </Section>
  );
};
