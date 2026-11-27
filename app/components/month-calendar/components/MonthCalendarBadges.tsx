import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import InlineText from "@/app/components/text/InlineText";
import { CALENDAR_MARK_ICON } from "../constants/CalendarMarkIcon.constants";
import type { MonthCalendarBadgesProps } from "../models/MonthCalendarBadgesProps.interface";
import {
  CALENDAR_BADGE_CLASSES,
  CALENDAR_BADGE_ICON_CLASS,
  CALENDAR_MARKS_CLASS,
} from "../styles/MonthCalendar.styles";
import type { JSX } from "react";

const MonthCalendarBadges = ({
  marks,
}: MonthCalendarBadgesProps): JSX.Element => (
  <InlineText className={CALENDAR_MARKS_CLASS}>
    {marks
      .filter((mark) => mark.count > 0)
      .map((mark) => (
        <InlineText
          key={mark.kind}
          className={CALENDAR_BADGE_CLASSES[mark.kind]}
        >
          <MaterialIcon
            name={CALENDAR_MARK_ICON[mark.kind]}
            className={CALENDAR_BADGE_ICON_CLASS}
          />
          {mark.count}
        </InlineText>
      ))}
  </InlineText>
);

export default MonthCalendarBadges;
