import DayPanel from "@/app/components/day-panel/DayPanel";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSectionProps } from "../models/DamageSectionProps.interface";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import { DAMAGE_REPORTS_SPLIT_CLASS } from "../styles/DamageReports.styles";
import DamageCalendar from "./DamageCalendar";
import DamageDayReports from "./DamageDayReports";
import type { JSX } from "react";

const DamageCalendarTab = ({
  filters,
  overview,
}: DamageSectionProps): JSX.Element => {
  const day = formatShortDay(filters.day);

  return (
    <div className={DAMAGE_REPORTS_SPLIT_CLASS}>
      <DamageCalendar
        filters={filters}
        overview={overview}
      />
      <DayPanel
        closeHref={buildDamageReportsHref(filters)}
        isOpen={filters.isDayOpen}
        title={
          filters.day === overview.today
            ? DAMAGE_REPORTS_COPY.DAY_TODAY(day)
            : day
        }
      >
        <DamageDayReports
          filters={filters}
          overview={overview}
        />
      </DayPanel>
    </div>
  );
};

export default DamageCalendarTab;
