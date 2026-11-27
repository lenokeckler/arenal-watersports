import LinkSelect from "@/app/components/link-select/LinkSelect";
import MonthCalendar from "@/app/components/month-calendar/MonthCalendar";
import { CALENDAR_MARK } from "@/app/components/month-calendar/constants/CalendarMark.constants";
import { resolveMonthLinks } from "@/app/utils/equipment-months/resolveMonthLinks";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import { MAINTENANCE_MACHINE_FIELD_ID } from "../constants/MaintenanceView.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildCalendarDays } from "../utils/buildCalendarDays";
import { buildMaintenanceHref } from "../utils/buildMaintenanceHref";
import { MAINTENANCE_COLUMN_CLASS } from "../styles/Maintenance.styles";
import type { JSX } from "react";

const MaintenanceCalendar = ({
  data,
  filters,
}: MaintenanceSectionProps): JSX.Element => (
  <div className={MAINTENANCE_COLUMN_CLASS}>
    <LinkSelect
      id={MAINTENANCE_MACHINE_FIELD_ID}
      label={MAINTENANCE_COPY.MACHINE_LABEL}
      allLabel={MAINTENANCE_COPY.ALL_MACHINES}
      allHref={buildMaintenanceHref(filters, {
        machineId: null,
      })}
      options={data.machines.map(({ code, id }) => ({
        href: buildMaintenanceHref(filters, {
          machineId: id,
        }),
        id,
        label: code,
      }))}
      value={filters.machineId}
    />
    <MonthCalendar
      days={buildCalendarDays({ data, filters })}
      label={MAINTENANCE_COPY.CALENDAR_LABEL}
      legend={[CALENDAR_MARK.JOB, CALENDAR_MARK.DAMAGE]}
      month={filters.month}
      {...resolveMonthLinks({
        month: filters.month,
        months: data.calendarMonths,
        toHref: (month) =>
          buildMaintenanceHref(filters, { month }),
      })}
    />
  </div>
);

export default MaintenanceCalendar;
