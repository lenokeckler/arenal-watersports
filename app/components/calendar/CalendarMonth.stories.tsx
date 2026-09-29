import { CalendarMonth } from "./CalendarMonth";
import { buildCalendarPeriod } from "./utils";
import { buildCalendarCells } from "./utils/formatCalendarPresentation";
import { CALENDAR_VIEW } from "@/app/constants";
import type { CalendarMonthProps } from "./models/CalendarMonthProps.interface";
import mocks from "@/app/constants/storybook/storybookMocks.json";

export default { component: CalendarMonth };
export const Month = {
  args: {
    title: mocks.title,
    cells: buildCalendarCells(
      buildCalendarPeriod(mocks.today, CALENDAR_VIEW.MONTH)
        .days,
      mocks.today,
      mocks.today.month
    ),
  } satisfies CalendarMonthProps,
};

export const Default = Month;
