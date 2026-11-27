import LinkSwitch from "@/app/components/link-switch/LinkSwitch";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import { MAINTENANCE_TAB } from "../constants/MaintenanceView.constants";
import type { MaintenanceSectionProps } from "../models/MaintenanceSectionProps.interface";
import { buildMaintenanceHref } from "../utils/buildMaintenanceHref";
import MaintenanceAttention from "./MaintenanceAttention";
import MaintenanceCalendarTab from "./MaintenanceCalendarTab";
import MaintenanceSummaryTab from "./MaintenanceSummaryTab";
import type { JSX } from "react";

const MaintenanceContent = ({
  data,
  filters,
}: MaintenanceSectionProps): JSX.Element => {
  const Tab =
    filters.tab === MAINTENANCE_TAB.CALENDAR
      ? MaintenanceCalendarTab
      : MaintenanceSummaryTab;

  return (
    <>
      <MaintenanceAttention
        data={data}
        filters={filters}
      />
      <LinkSwitch
        label={MAINTENANCE_COPY.TABS_LABEL}
        options={Object.values(MAINTENANCE_TAB).map(
          (tab) => ({
            href: buildMaintenanceHref(filters, { tab }),
            isCurrent: filters.tab === tab,
            key: tab,
            label: MAINTENANCE_COPY.TABS[tab],
          })
        )}
      />
      <Tab
        data={data}
        filters={filters}
      />
    </>
  );
};

export default MaintenanceContent;
