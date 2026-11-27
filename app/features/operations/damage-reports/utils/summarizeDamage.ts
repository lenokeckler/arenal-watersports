import { EQUIPMENT_PERIOD } from "@/app/constants";
import { countDamageByCause } from "@/app/utils/equipment-stats/countDamageByCause";
import { rankUnits } from "@/app/utils/equipment-stats/rankUnits";
import {
  DAMAGE_PERIOD,
  DAMAGE_REPORTS_LIMITS,
} from "../constants/DamageReports.constants";
import type { DamagePeriodSelection } from "../models/DamagePeriodSelection.type";
import type { DamageOverview } from "../models/DamageOverview.interface";
import type { DamageSummary } from "../models/DamageSummary.interface";

export const summarizeDamage = (
  { recent, today }: DamageOverview,
  { period }: DamagePeriodSelection
): DamageSummary => {
  const month = today.slice(
    0,
    EQUIPMENT_PERIOD.MONTH_KEY_LENGTH
  );
  const inPeriod =
    period === DAMAGE_PERIOD.MONTH
      ? recent.filter((report) =>
          report.date.startsWith(month)
        )
      : recent;
  const finished = inPeriod.filter(
    (report) => !report.isPending
  );

  return {
    causeCounts: countDamageByCause(finished),
    hasPendingInPeriod: finished.length < inPeriod.length,
    periodTotal: inPeriod.length,
    topUnits: rankUnits(
      inPeriod.map((report) => ({
        amount: 1,
        unitCode: report.unitCode,
        unitId: report.unitId,
      })),
      DAMAGE_REPORTS_LIMITS.TOP_UNITS
    ),
  };
};
