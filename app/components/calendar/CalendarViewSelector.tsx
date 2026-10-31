import type { ReactElement } from "react";
import { Button } from "@/app/components";
import {
  ARIA_ROLE,
  BUTTON,
  CALENDAR_TEXT,
} from "@/app/constants";
import type { CalendarToolbarProps } from "./models/CalendarToolbarProps.interface";
import {
  CALENDAR_VIEW_GROUP_CLASS,
  resolveCalendarButtonClass,
} from "./styles/Calendar.styles";

export const CalendarViewSelector = ({
  selectedView,
  allowedViews,
  onSelect,
}: Pick<
  CalendarToolbarProps,
  "selectedView" | "allowedViews" | "onSelect"
>): ReactElement => (
  <div
    className={CALENDAR_VIEW_GROUP_CLASS}
    role={ARIA_ROLE.GROUP}
    aria-label={CALENDAR_TEXT.VIEWS}
  >
    {allowedViews.map((view) => (
      <Button
        key={view}
        variant={BUTTON.BASE}
        className={resolveCalendarButtonClass(
          view === selectedView
        )}
        aria-pressed={view === selectedView}
        onClick={() => onSelect(view)}
      >
        {CALENDAR_TEXT.LABELS[view]}
      </Button>
    ))}
  </div>
);
