import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistorySectionProps } from "../models/UnitHistorySectionProps.interface";
import { formatSpend } from "../utils/formatSpend";
import {
  UNIT_HISTORY_META_CLASS,
  UNIT_HISTORY_STATS_CLASS,
  UNIT_HISTORY_STAT_CLASS,
  UNIT_HISTORY_STAT_VALUE_CLASS,
} from "../styles/UnitHistory.styles";
import type { JSX } from "react";

const UnitHistoryStats = ({
  data: { jobs },
}: UnitHistorySectionProps): JSX.Element => (
  <div className={UNIT_HISTORY_STATS_CLASS}>
    {[
      {
        label: UNIT_HISTORY_COPY.STAT_JOBS,
        value: jobs.length,
      },
      {
        label: UNIT_HISTORY_COPY.STAT_SPEND,
        value: formatSpend(jobs),
      },
    ].map((stat) => (
      <Text
        key={stat.label}
        className={UNIT_HISTORY_STAT_CLASS}
      >
        <InlineText className={UNIT_HISTORY_META_CLASS}>
          {stat.label}
        </InlineText>
        <InlineText
          className={UNIT_HISTORY_STAT_VALUE_CLASS}
        >
          {stat.value}
        </InlineText>
      </Text>
    ))}
  </div>
);

export default UnitHistoryStats;
