import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import InlineText from "@/app/components/text/InlineText";
import { CALENDAR_MARK_ICON } from "../constants/CalendarMarkIcon.constants";
import { MONTH_CALENDAR_COPY } from "../constants/MonthCalendarCopy.constants";
import type { MonthCalendarLegendProps } from "../models/MonthCalendarLegendProps.interface";
import {
  CALENDAR_BADGE_CLASSES,
  CALENDAR_BADGE_ICON_CLASS,
  CALENDAR_LEGEND_CLASS,
  CALENDAR_LEGEND_ITEM_CLASS,
} from "../styles/MonthCalendar.styles";
import type { JSX } from "react";

const MonthCalendarLegend = ({
  legend,
}: MonthCalendarLegendProps): JSX.Element => (
  <div className={CALENDAR_LEGEND_CLASS}>
    {legend.map((kind) => (
      <InlineText
        key={kind}
        className={CALENDAR_LEGEND_ITEM_CLASS}
      >
        <InlineText
          className={CALENDAR_BADGE_CLASSES[kind]}
        >
          <MaterialIcon
            name={CALENDAR_MARK_ICON[kind]}
            className={CALENDAR_BADGE_ICON_CLASS}
          />
        </InlineText>
        {MONTH_CALENDAR_COPY.LEGEND[kind]}
      </InlineText>
    ))}
  </div>
);

export default MonthCalendarLegend;
