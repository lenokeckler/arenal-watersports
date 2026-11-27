import { buildSpendBars } from "@/app/utils/equipment-stats/buildSpendBars";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildMaintenanceHref } from "../utils/buildMaintenanceHref";
import { buildSpendRanking } from "../utils/buildSpendRanking";
import {
  MAINTENANCE_COLUMN_CLASS,
  MAINTENANCE_SPLIT_CLASS,
} from "../styles/Maintenance.styles";
import MaintenanceCurrencySwitch from "./MaintenanceCurrencySwitch";
import MaintenanceSpendSection from "./MaintenanceSpendSection";
import MaintenanceStats from "./MaintenanceStats";
import MaintenanceTopSpend from "./MaintenanceTopSpend";
import type { JSX } from "react";

const MaintenanceSummaryTab = ({
  data,
  filters,
}: MaintenanceSectionProps): JSX.Element => (
  <div className={MAINTENANCE_SPLIT_CLASS}>
    <div className={MAINTENANCE_COLUMN_CLASS}>
      <MaintenanceCurrencySwitch filters={filters} />
      <MaintenanceStats
        currency={filters.currency}
        jobs={data.jobs}
      />
      <MaintenanceSpendSection
        bars={buildSpendBars({
          currency: filters.currency,
          currentMonth: filters.bar,
          jobs: data.jobs,
          months: data.months,
          resolveHref: (month) =>
            buildMaintenanceHref(filters, { bar: month }),
        })}
      />
    </div>
    <div className={MAINTENANCE_COLUMN_CLASS}>
      <MaintenanceTopSpend
        rows={buildSpendRanking(
          data.jobs,
          filters.currency
        )}
      />
    </div>
  </div>
);

export default MaintenanceSummaryTab;
