import type { RankChartRow } from "@/app/components/rank-chart/models/RankChartRow.interface";
import type { CurrencyCode } from "@/app/constants/money/CurrencyCode.constants";
import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import { buildRankRows } from "@/app/utils/equipment-stats/buildRankRows";
import { listRetiredUnitIds } from "@/app/utils/equipment-stats/listRetiredUnitIds";
import { rankUnits } from "@/app/utils/equipment-stats/rankUnits";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import { MAINTENANCE_LIMITS } from "../constants/MaintenanceView.constants";

export const buildSpendRanking = (
  jobs: EquipmentJob[],
  currency: CurrencyCode
): RankChartRow[] =>
  buildRankRows({
    formatValue: (amount) =>
      formatMoney({ amount, currency }),
    retiredIds: listRetiredUnitIds(jobs),
    units: rankUnits(
      jobs
        .filter((job) => job.currency === currency)
        .map((job) => ({
          amount: safeNumber(job.costAmount),
          unitCode: job.unitCode,
          unitId: job.unitId,
        })),
      MAINTENANCE_LIMITS.TOP_UNITS
    ),
  });
