import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { sumJobCost } from "@/app/utils/equipment-stats/sumJobCost";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceStatsProps } from "../models/MaintenanceStatsProps.interface";
import { MAINTENANCE_HINT_CLASS } from "../styles/Maintenance.styles";
import {
  SUMMARY_STATS_CLASS,
  SUMMARY_STAT_CLASS,
  SUMMARY_STAT_VALUE_CLASS,
} from "../styles/MaintenanceSummary.styles";
import type { JSX } from "react";

const MaintenanceStats = ({
  currency,
  jobs,
}: MaintenanceStatsProps): JSX.Element => (
  <div className={SUMMARY_STATS_CLASS}>
    {[
      {
        label: MAINTENANCE_COPY.STAT_SPEND,
        value: formatMoney({
          amount: sumJobCost(jobs, currency),
          currency,
        }),
      },
      {
        label: MAINTENANCE_COPY.STAT_JOBS,
        value: jobs.length,
      },
    ].map((stat) => (
      <Text
        key={stat.label}
        className={SUMMARY_STAT_CLASS}
      >
        <InlineText className={MAINTENANCE_HINT_CLASS}>
          {stat.label}
        </InlineText>
        <InlineText className={SUMMARY_STAT_VALUE_CLASS}>
          {stat.value}
        </InlineText>
      </Text>
    ))}
  </div>
);

export default MaintenanceStats;
