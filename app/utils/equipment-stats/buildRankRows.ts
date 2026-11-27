import type { RankChartRow } from "@/app/components/rank-chart/models/RankChartRow.interface";
import { EQUIPMENT_RETIRED, PATHS } from "@/app/constants";
import type { RankRowsRequest } from "./models/RankRowsRequest.interface";

export const buildRankRows = ({
  formatValue,
  retiredIds,
  units,
}: RankRowsRequest): RankChartRow[] =>
  units.map(({ total, unitCode, unitId }) => {
    const isRetired = retiredIds.has(unitId);

    return {
      amount: total,
      href: isRetired
        ? null
        : PATHS.OPERATIONS.UNIT_HISTORY(unitId),
      key: unitId,
      label: isRetired
        ? EQUIPMENT_RETIRED.LABELLED(unitCode)
        : unitCode,
      valueText: formatValue(total),
    };
  });
