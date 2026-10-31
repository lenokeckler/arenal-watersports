import type { ReactElement } from "react";
import { Button, Title } from "@/app/components";
import {
  BUTTON,
  CALENDAR_TEXT,
  CALENDAR_PRESENTATION,
  ARIA_ROLE,
  TitleVariant,
} from "@/app/constants";
import type { CalendarToolbarProps } from "./models/CalendarToolbarProps.interface";
import {
  CALENDAR_TOOLBAR_CLASS,
  CALENDAR_TITLE_CLASS,
  CALENDAR_ACTIONS_CLASS,
  CALENDAR_PERIOD_TITLE_SR_ONLY_CLASS,
  CALENDAR_VIEW_GROUP_CLASS,
  CALENDAR_BUTTON_CLASS,
  resolveCalendarButtonClass,
} from "./styles/Calendar.styles";

const CalendarViewSelector = ({
  selectedView,
  allowedViews,
  onSelect,
}: CalendarToolbarProps): ReactElement => (
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

export const CalendarToolbar = (
  props: CalendarToolbarProps
): ReactElement => (
  <div>
    <div className={CALENDAR_TOOLBAR_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={props.heading}
        id={CALENDAR_PRESENTATION.TITLE_ID}
        className={CALENDAR_TITLE_CLASS}
      />
      <CalendarViewSelector {...props} />
    </div>
    <Title
      variant={TitleVariant.SECONDARY}
      text={props.title}
      className={CALENDAR_PERIOD_TITLE_SR_ONLY_CLASS}
    />
    <div
      className={CALENDAR_ACTIONS_CLASS}
      role={ARIA_ROLE.GROUP}
      aria-label={CALENDAR_TEXT.NAVIGATION}
    >
      {[
        {
          label: CALENDAR_TEXT.PREVIOUS,
          action: props.onPrevious,
        },
        {
          label: CALENDAR_TEXT.TODAY,
          action: props.onToday,
        },
        { label: CALENDAR_TEXT.NEXT, action: props.onNext },
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
  </div>
);
