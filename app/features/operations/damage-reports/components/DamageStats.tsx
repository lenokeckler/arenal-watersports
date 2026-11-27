import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageStatsProps } from "../models/DamageStatsProps.interface";
import {
  DAMAGE_REPORTS_HINT_CLASS,
  DAMAGE_REPORTS_STATS_CLASS,
  DAMAGE_REPORTS_STAT_CLASS,
  DAMAGE_REPORTS_STAT_VALUE_CLASS,
} from "../styles/DamageReports.styles";
import type { JSX } from "react";

const DamageStats = ({
  pendingTotal,
  periodTotal,
}: DamageStatsProps): JSX.Element => (
  <div className={DAMAGE_REPORTS_STATS_CLASS}>
    {[
      {
        label: DAMAGE_REPORTS_COPY.STAT_TOTAL,
        value: periodTotal,
      },
      {
        label: DAMAGE_REPORTS_COPY.STAT_PENDING,
        value: pendingTotal,
      },
    ].map((stat) => (
      <Text
        key={stat.label}
        className={DAMAGE_REPORTS_STAT_CLASS}
      >
        <InlineText className={DAMAGE_REPORTS_HINT_CLASS}>
          {stat.label}
        </InlineText>
        <InlineText
          className={DAMAGE_REPORTS_STAT_VALUE_CLASS}
        >
          {stat.value}
        </InlineText>
      </Text>
    ))}
  </div>
);

export default DamageStats;
