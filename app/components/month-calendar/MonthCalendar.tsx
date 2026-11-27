import Section from "@/app/components/section/Section";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { formatMonthName } from "@/app/utils/equipment-months/formatEquipmentDates";
import MonthCalendarArrow from "./components/MonthCalendarArrow";
import MonthCalendarGrid from "./components/MonthCalendarGrid";
import MonthCalendarLegend from "./components/MonthCalendarLegend";
import { MONTH_CALENDAR_COPY } from "./constants/MonthCalendarCopy.constants";
import type { MonthCalendarProps } from "./models/MonthCalendarProps.interface";
import {
  CALENDAR_CLASS,
  CALENDAR_HEADER_CLASS,
  CALENDAR_MONTH_CLASS,
} from "./styles/MonthCalendar.styles";
import type { JSX } from "react";

const MonthCalendar = ({
  days,
  label,
  legend,
  month,
  nextHref,
  previousHref,
}: MonthCalendarProps): JSX.Element => (
  <Section
    className={CALENDAR_CLASS}
    aria-label={label}
  >
    <div className={CALENDAR_HEADER_CLASS}>
      <MonthCalendarArrow
        glyph={MONTH_CALENDAR_COPY.PREVIOUS_GLYPH}
        href={previousHref}
        name={MONTH_CALENDAR_COPY.PREVIOUS_MONTH}
      />
      <Title
        variant={TitleVariant.SECONDARY}
        text={formatMonthName(month)}
        className={CALENDAR_MONTH_CLASS}
      />
      <MonthCalendarArrow
        glyph={MONTH_CALENDAR_COPY.NEXT_GLYPH}
        href={nextHref}
        name={MONTH_CALENDAR_COPY.NEXT_MONTH}
      />
    </div>
    <MonthCalendarGrid
      days={days}
      month={month}
    />
    <MonthCalendarLegend legend={legend} />
  </Section>
);

export default MonthCalendar;
