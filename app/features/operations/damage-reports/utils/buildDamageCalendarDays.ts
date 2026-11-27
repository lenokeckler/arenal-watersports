import { CALENDAR_MARK } from "@/app/components/month-calendar/constants/CalendarMark.constants";
import type { MonthCalendarDay } from "@/app/components/month-calendar/models/MonthCalendarDay.interface";
import { buildMonthDays } from "@/app/utils/equipment-months/buildMonthDays";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSectionProps } from "../models/DamageSectionProps.interface";
import { buildDamageReportsHref } from "./buildDamageReportsHref";
import { filterByCause } from "./filterByCause";

export const buildDamageCalendarDays = ({
  filters,
  overview,
}: DamageSectionProps): MonthCalendarDay[] => {
  const shown = filterByCause(
    overview.calendarReports,
    filters.cause
  );

  return buildMonthDays(filters.month, overview.today).map(
    (day) => {
      const damages = shown.filter(
        (report) => report.date === day.isoDate
      ).length;

      return {
        ...day,
        href: buildDamageReportsHref(filters, {
          day: day.isoDate,
          isDayOpen: true,
        }),
        isSelected: day.isoDate === filters.day,
        label: DAMAGE_REPORTS_COPY.DAY_LABEL(
          formatShortDay(day.isoDate),
          damages
        ),
        marks: [
          { count: damages, kind: CALENDAR_MARK.DAMAGE },
        ],
      };
    }
  );
};
