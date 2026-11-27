import LinkSwitch from "@/app/components/link-switch/LinkSwitch";
import { DAMAGE_TAB } from "../constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSectionProps } from "../models/DamageSectionProps.interface";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import DamageCalendarTab from "./DamageCalendarTab";
import DamageChartsTab from "./DamageChartsTab";
import DamagePendingStrip from "./DamagePendingStrip";
import type { JSX } from "react";

const DamageReportsContent = ({
  filters,
  overview,
}: DamageSectionProps): JSX.Element => {
  const Tab =
    filters.tab === DAMAGE_TAB.CALENDAR
      ? DamageCalendarTab
      : DamageChartsTab;

  return (
    <>
      <DamagePendingStrip
        filters={filters}
        overview={overview}
      />
      <LinkSwitch
        label={DAMAGE_REPORTS_COPY.TABS_LABEL}
        options={Object.values(DAMAGE_TAB).map((tab) => ({
          href: buildDamageReportsHref(filters, { tab }),
          isCurrent: filters.tab === tab,
          key: tab,
          label: DAMAGE_REPORTS_COPY.TABS[tab],
        }))}
      />
      <Tab
        filters={filters}
        overview={overview}
      />
    </>
  );
};

export default DamageReportsContent;
