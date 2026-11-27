import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { UNIT_HISTORY_SEPARATOR } from "../constants/UnitHistory.constants";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";

export const describeJobCost = ({
  costAmount,
  currency,
  isExternal,
}: EquipmentJob): string =>
  [
    costAmount !== null && currency
      ? formatMoney({ amount: costAmount, currency })
      : UNIT_HISTORY_COPY.NO_COST,
    isExternal ? UNIT_HISTORY_COPY.EXTERNAL : null,
  ]
    .filter(Boolean)
    .join(UNIT_HISTORY_SEPARATOR);
