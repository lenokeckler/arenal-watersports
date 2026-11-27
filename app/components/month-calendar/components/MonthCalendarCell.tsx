import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import { ARIA_CURRENT } from "@/app/constants";
import type { MonthCalendarCellProps } from "../models/MonthCalendarCellProps.interface";
import {
  CALENDAR_DAY_FUTURE_CLASS,
  resolveCalendarDayClass,
} from "../styles/MonthCalendar.styles";
import MonthCalendarBadges from "./MonthCalendarBadges";
import type { JSX } from "react";

const MonthCalendarCell = ({
  cell,
}: MonthCalendarCellProps): JSX.Element => {
  if (cell.isFuture) {
    return (
      <InlineText className={CALENDAR_DAY_FUTURE_CLASS}>
        {cell.day}
      </InlineText>
    );
  }

  return (
    <Link
      href={cell.href}
      ariaLabel={cell.label}
      ariaCurrent={
        cell.isSelected ? ARIA_CURRENT.PAGE : undefined
      }
      className={resolveCalendarDayClass(cell)}
      replace
      scroll={false}
    >
      <InlineText>{cell.day}</InlineText>
      <MonthCalendarBadges marks={cell.marks} />
    </Link>
  );
};

export default MonthCalendarCell;
