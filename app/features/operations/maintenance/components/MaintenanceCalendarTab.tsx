import DayPanel from "@/app/components/day-panel/DayPanel";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildMaintenanceHref } from "../utils/buildMaintenanceHref";
import { MAINTENANCE_SPLIT_CLASS } from "../styles/Maintenance.styles";
import MaintenanceCalendar from "./MaintenanceCalendar";
import MaintenanceDayAgenda from "./MaintenanceDayAgenda";
import type { JSX } from "react";

const MaintenanceCalendarTab = ({
  data,
  filters,
}: MaintenanceSectionProps): JSX.Element => {
  const day = formatShortDay(filters.day);

  return (
    <div className={MAINTENANCE_SPLIT_CLASS}>
      <MaintenanceCalendar
        data={data}
        filters={filters}
      />
      <DayPanel
        closeHref={buildMaintenanceHref(filters)}
        isOpen={filters.isDayOpen}
        title={
          filters.day === data.today
            ? MAINTENANCE_COPY.DAY_TODAY(day)
            : day
        }
      >
        <MaintenanceDayAgenda
          data={data}
          filters={filters}
        />
      </DayPanel>
    </div>
  );
};

export default MaintenanceCalendarTab;
