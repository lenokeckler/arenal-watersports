import type { ReactElement } from "react";
import { Title } from "@/app/components";
import {
  CALENDAR_PRESENTATION,
  TitleVariant,
} from "@/app/constants";
import type { CalendarToolbarProps } from "./models/CalendarToolbarProps.interface";
import {
  CALENDAR_PERIOD_TITLE_SR_ONLY_CLASS,
  CALENDAR_TITLE_CLASS,
  CALENDAR_TOOLBAR_CLASS,
} from "./styles/Calendar.styles";
import { CalendarNavigation } from "./CalendarNavigation";
import { CalendarViewSelector } from "./CalendarViewSelector";

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
    <CalendarNavigation {...props} />
  </div>
);
