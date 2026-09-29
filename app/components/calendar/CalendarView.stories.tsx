import type { ReactElement } from "react";
import { CALENDAR_ALLOWED_VIEWS } from "@/app/constants";
import { ReduxProvider } from "@/app/providers/ReduxProvider";
import { CalendarView } from "./CalendarView";
import type { CalendarViewProps } from "./models/CalendarViewProps.interface";
import mocks from "@/app/constants/storybook/storybookMocks.json";

const CalendarStory = (
  props: CalendarViewProps
): ReactElement => (
  <ReduxProvider>
    <CalendarView {...props} />
  </ReduxProvider>
);

export default {
  title: mocks.storyTitle,
  component: CalendarStory,
};
export const Reservations = {
  args: {
    today: mocks.today,
    allowedViews: CALENDAR_ALLOWED_VIEWS.RESERVATIONS,
  } satisfies CalendarViewProps,
};
export const Operations = {
  args: {
    today: mocks.today,
    allowedViews: CALENDAR_ALLOWED_VIEWS.OPERATIONS,
  } satisfies CalendarViewProps,
};

export const Default = Reservations;
