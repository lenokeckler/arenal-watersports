import { CalendarDays } from "./CalendarDays";
import { buildCalendarPeriod } from "./utils";
import { buildCalendarCells } from "./utils/formatCalendarPresentation";
import { CALENDAR_VIEW } from "@/app/constants";
import { CALENDAR_DAYS_CLASS } from "./styles/Calendar.styles";
import type { CalendarDaysProps } from "./models/CalendarDaysProps.interface";
import mocks from "@/app/constants/storybook/storybookMocks.json";

export default { component: CalendarDays };
export const Week = {
  args: {
    className: CALENDAR_DAYS_CLASS,
    cells: buildCalendarCells(
      buildCalendarPeriod(mocks.today, CALENDAR_VIEW.WEEK)
        .days,
      mocks.today,
      mocks.today.month
    ),
  } satisfies CalendarDaysProps,
};

export const Default = Week;
