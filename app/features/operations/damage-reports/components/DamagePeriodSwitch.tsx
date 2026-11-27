import LinkSwitch from "@/app/components/link-switch/LinkSwitch";
import { DAMAGE_PERIOD } from "../constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamagePeriodSwitchProps } from "../models/DamagePeriodSwitchProps.type";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import type { JSX } from "react";

const DamagePeriodSwitch = ({
  filters,
}: DamagePeriodSwitchProps): JSX.Element => (
  <LinkSwitch
    label={DAMAGE_REPORTS_COPY.PERIOD_LABEL}
    options={Object.values(DAMAGE_PERIOD).map((period) => ({
      href: buildDamageReportsHref(filters, { period }),
      isCurrent: filters.period === period,
      key: period,
      label: DAMAGE_REPORTS_COPY.PERIODS[period],
    }))}
  />
);

export default DamagePeriodSwitch;
