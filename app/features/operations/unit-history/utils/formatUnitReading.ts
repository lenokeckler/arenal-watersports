import { EQUIPMENT_PERIOD } from "@/app/constants";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistoryUnit } from "../models/UnitHistoryUnit.interface";

export const formatUnitReading = (
  value: number,
  metric: NonNullable<UnitHistoryUnit["usageMetric"]>
): string =>
  `${value.toLocaleString(EQUIPMENT_PERIOD.LOCALE)}${UNIT_HISTORY_COPY.USAGE_UNIT[metric]}`;
