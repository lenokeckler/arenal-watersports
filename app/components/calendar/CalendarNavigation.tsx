import type { ReactElement } from "react";
import { Button } from "@/app/components";
import {
  ARIA_ROLE,
  BUTTON,
  CALENDAR_TEXT,
} from "@/app/constants";
import type { CalendarToolbarProps } from "./models/CalendarToolbarProps.interface";
import {
  CALENDAR_ACTIONS_CLASS,
  CALENDAR_BUTTON_CLASS,
} from "./styles/Calendar.styles";

export const CalendarNavigation = ({
  onPrevious,
  onToday,
  onNext,
}: Pick<
  CalendarToolbarProps,
  "onPrevious" | "onToday" | "onNext"
>): ReactElement => (
  <div
    className={CALENDAR_ACTIONS_CLASS}
    role={ARIA_ROLE.GROUP}
    aria-label={CALENDAR_TEXT.NAVIGATION}
  >
    {[
      { label: CALENDAR_TEXT.PREVIOUS, action: onPrevious },
      { label: CALENDAR_TEXT.TODAY, action: onToday },
      { label: CALENDAR_TEXT.NEXT, action: onNext },
    ].map((item) => (
      <Button
        key={item.label}
        variant={BUTTON.BASE}
        className={CALENDAR_BUTTON_CLASS}
        onClick={item.action}
      >
        {item.label}
      </Button>
    ))}
  </div>
);
