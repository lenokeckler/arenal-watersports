import LinkSelect from "@/app/components/link-select/LinkSelect";
import MonthCalendar from "@/app/components/month-calendar/MonthCalendar";
import { CALENDAR_MARK } from "@/app/components/month-calendar/constants/CalendarMark.constants";
import {
  DAMAGE_CAUSE_LABELS,
  DAMAGE_CAUSE_ORDER,
} from "@/app/constants";
import { resolveMonthLinks } from "@/app/utils/equipment-months/resolveMonthLinks";
import { DAMAGE_CAUSE_FIELD_ID } from "../constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSectionProps } from "../models/DamageSectionProps.interface";
import { buildDamageCalendarDays } from "../utils/buildDamageCalendarDays";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import { DAMAGE_REPORTS_COLUMN_CLASS } from "../styles/DamageReports.styles";
import type { JSX } from "react";

const DamageCalendar = ({
  filters,
  overview,
}: DamageSectionProps): JSX.Element => (
  <div className={DAMAGE_REPORTS_COLUMN_CLASS}>
    <LinkSelect
      id={DAMAGE_CAUSE_FIELD_ID}
      label={DAMAGE_REPORTS_COPY.CAUSE_LABEL}
      allLabel={DAMAGE_REPORTS_COPY.ALL_CAUSES}
      allHref={buildDamageReportsHref(filters, {
        cause: null,
      })}
      options={DAMAGE_CAUSE_ORDER.map((cause) => ({
        href: buildDamageReportsHref(filters, { cause }),
        id: cause,
        label: DAMAGE_CAUSE_LABELS[cause],
      }))}
      value={filters.cause}
    />
    <MonthCalendar
      days={buildDamageCalendarDays({ filters, overview })}
      label={DAMAGE_REPORTS_COPY.CALENDAR_LABEL}
      legend={[CALENDAR_MARK.DAMAGE]}
      month={filters.month}
      {...resolveMonthLinks({
        month: filters.month,
        months: overview.calendarMonths,
        toHref: (month) =>
          buildDamageReportsHref(filters, { month }),
      })}
    />
  </div>
);

export default DamageCalendar;
