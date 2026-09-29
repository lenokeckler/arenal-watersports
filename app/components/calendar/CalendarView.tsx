"use client";

import type { ReactElement } from "react";
import type { NullableRef } from "@/app/types";

import { Section, Text } from "@/app/components";
import {
  CALENDAR_PRESENTATION,
  ARIA_ROLE,
  CALENDAR_VIEW,
} from "@/app/constants";
import type { CalendarViewProps } from "./models/CalendarViewProps.interface";
import { useCalendarViewModel } from "./hooks/useCalendarViewModel";
import { CalendarToolbar } from "./CalendarToolbar";
import { CalendarDays } from "./CalendarDays";
import { CalendarMonth } from "./CalendarMonth";
import type { CalendarViewModel } from "./models/CalendarViewModel.interface";
import {
  CALENDAR_ROOT_CLASS,
  CALENDAR_ERROR_CLASS,
  CALENDAR_YEAR_CLASS,
} from "./styles/Calendar.styles";

const CalendarPeriods = (
  calendar: CalendarViewModel
): NullableRef<ReactElement> => {
  if (!calendar.hasAccess) {
    return null;
  }
  if (calendar.selectedView === CALENDAR_VIEW.YEAR) {
    return (
      <div className={CALENDAR_YEAR_CLASS}>
        {calendar.months.map((month) => (
          <CalendarMonth
            key={month.title}
            {...month}
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
        cells={calendar.days}
      />
    );
  }
  return (
    <CalendarDays
      className={calendar.daysClassName}
      cells={calendar.days}
    />
  );
};

export const CalendarView = (
  props: CalendarViewProps
): ReactElement => {
  const calendar = useCalendarViewModel(props);
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
      <CalendarPeriods {...calendar} />
    </Section>
  );
};
