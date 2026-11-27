import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import type { MonthCalendarArrowProps } from "../models/MonthCalendarArrowProps.interface";
import {
  CALENDAR_ARROW_CLASS,
  CALENDAR_ARROW_OFF_CLASS,
} from "../styles/MonthCalendar.styles";
import type { JSX } from "react";

const MonthCalendarArrow = ({
  glyph,
  href,
  name,
}: MonthCalendarArrowProps): JSX.Element =>
  href ? (
    <Link
      href={href}
      ariaLabel={name}
      className={CALENDAR_ARROW_CLASS}
      replace
      scroll={false}
    >
      {glyph}
    </Link>
  ) : (
    <InlineText
      className={CALENDAR_ARROW_OFF_CLASS}
      aria-hidden
    >
      {glyph}
    </InlineText>
  );

export default MonthCalendarArrow;
