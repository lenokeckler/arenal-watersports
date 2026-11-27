import LinkSwitch from "@/app/components/link-switch/LinkSwitch";
import Section from "@/app/components/section/Section";
import SpendChart from "@/app/components/spend-chart/SpendChart";
import {
  EQUIPMENT_CURRENCIES,
  EQUIPMENT_CURRENCY_LABELS,
  PATHS,
} from "@/app/constants";
import { buildSpendBars } from "@/app/utils/equipment-stats/buildSpendBars";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { EQUIPMENT_HUB_COPY } from "../constants/EquipmentHubCopy.constants";
import type { EquipmentHubSectionProps } from "../models/EquipmentHubSectionProps.interface";
import { EQUIPMENT_HUB_CHART_CLASS } from "../styles/EquipmentHub.styles";
import EquipmentHubChartHeader from "./EquipmentHubChartHeader";
import type { JSX } from "react";

const EquipmentHubSpendChart = ({
  currency,
  data: { jobs, months },
}: EquipmentHubSectionProps): JSX.Element => {
  const currentMonth = safeString(months.at(-1));
  const toSummary = (month: string): string =>
    PATHS.OPERATIONS.MAINTENANCE_SUMMARY(month, currency);

  return (
    <Section className={EQUIPMENT_HUB_CHART_CLASS}>
      <EquipmentHubChartHeader
        href={toSummary(currentMonth)}
        linkLabel={EQUIPMENT_HUB_COPY.SEE_SUMMARY}
        title={EQUIPMENT_HUB_COPY.SPEND_HEADING}
      />
      <LinkSwitch
        label={EQUIPMENT_HUB_COPY.CURRENCY_LABEL}
        options={EQUIPMENT_CURRENCIES.map((code) => ({
          href: PATHS.OPERATIONS.EQUIPMENT_SPEND(code),
          isCurrent: code === currency,
          key: code,
          label: EQUIPMENT_CURRENCY_LABELS[code],
        }))}
      />
      <SpendChart
        label={EQUIPMENT_HUB_COPY.SPEND_HEADING}
        bars={buildSpendBars({
          currency,
          currentMonth,
          jobs,
          months,
          resolveHref: toSummary,
        })}
      />
    </Section>
  );
};

export default EquipmentHubSpendChart;
