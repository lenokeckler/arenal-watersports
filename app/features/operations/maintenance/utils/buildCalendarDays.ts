import { CALENDAR_MARK } from "@/app/components/month-calendar/constants/CalendarMark.constants";
import type { MonthCalendarDay } from "@/app/components/month-calendar/models/MonthCalendarDay.interface";
import { buildMonthDays } from "@/app/utils/equipment-months/buildMonthDays";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildMaintenanceHref } from "./buildMaintenanceHref";
import { matchesDayEntry } from "./matchesDayEntry";

export const buildCalendarDays = ({
  data: { calendar, today },
  filters,
}: MaintenanceSectionProps): MonthCalendarDay[] =>
  buildMonthDays(filters.month, today).map((day) => {
    const selection = { ...filters, day: day.isoDate };
    const [jobs, damages] = [
      calendar.jobs,
      calendar.reports,
    ].map(
      (entries) =>
        entries.filter((entry) =>
          matchesDayEntry(entry, selection)
        ).length
    );

    return {
      ...day,
      href: buildMaintenanceHref(filters, {
        day: day.isoDate,
        isDayOpen: true,
      }),
      isSelected: day.isoDate === filters.day,
      label: MAINTENANCE_COPY.DAY_LABEL(
        formatShortDay(day.isoDate),
        jobs,
        damages
      ),
      marks: [
        { count: jobs, kind: CALENDAR_MARK.JOB },
        { count: damages, kind: CALENDAR_MARK.DAMAGE },
      ],
    };
  });
