import { CalendarToolbar } from "./CalendarToolbar";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_VIEW,
  STRING,
} from "@/app/constants";
import type { CalendarToolbarProps } from "./models/CalendarToolbarProps.interface";
import mocks from "@/app/constants/storybook/storybookMocks.json";

const storyAction = () => STRING.Empty;

export default { component: CalendarToolbar };
export const Toolbar = {
  args: {
    title: mocks.title,
    selectedView: CALENDAR_VIEW.DAY,
    allowedViews: CALENDAR_ALLOWED_VIEWS.RESERVATIONS,
    onSelect: storyAction,
    onPrevious: storyAction,
    onToday: storyAction,
    onNext: storyAction,
  } satisfies CalendarToolbarProps,
};

export const Default = Toolbar;
