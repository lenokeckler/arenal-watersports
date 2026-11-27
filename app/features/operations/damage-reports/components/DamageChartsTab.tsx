import { buildRankRows } from "@/app/utils/equipment-stats/buildRankRows";
import { listRetiredUnitIds } from "@/app/utils/equipment-stats/listRetiredUnitIds";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSectionProps } from "../models/DamageSectionProps.interface";
import { summarizeDamage } from "../utils/summarizeDamage";
import { DAMAGE_REPORTS_SPLIT_CLASS } from "../styles/DamageReports.styles";
import DamageCauseSection from "./DamageCauseSection";
import DamagePeriodSwitch from "./DamagePeriodSwitch";
import DamageStats from "./DamageStats";
import DamageTopUnits from "./DamageTopUnits";
import type { JSX } from "react";

const DamageChartsTab = ({
  filters,
  overview,
}: DamageSectionProps): JSX.Element => {
  const summary = summarizeDamage(overview, filters);

  return (
    <>
      <DamagePeriodSwitch filters={filters} />
      <DamageStats
        pendingTotal={overview.pending.length}
        periodTotal={summary.periodTotal}
      />
      <div className={DAMAGE_REPORTS_SPLIT_CLASS}>
        <DamageCauseSection
          filters={filters}
          summary={summary}
        />
        <DamageTopUnits
          rows={buildRankRows({
            formatValue: DAMAGE_REPORTS_COPY.TOP_COUNT,
            retiredIds: listRetiredUnitIds(overview.recent),
            units: summary.topUnits,
          })}
        />
      </div>
    </>
  );
};

export default DamageChartsTab;
