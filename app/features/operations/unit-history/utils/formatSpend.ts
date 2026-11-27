import { EQUIPMENT_CURRENCIES } from "@/app/constants";
import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import { sumJobCost } from "@/app/utils/equipment-stats/sumJobCost";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";

const SEPARATOR = " + ";

export const formatSpend = (jobs: EquipmentJob[]): string =>
  EQUIPMENT_CURRENCIES.map((currency) => ({
    amount: sumJobCost(jobs, currency),
    currency,
  }))
    .filter(({ amount }) => amount > 0)
    .map(formatMoney)
    .join(SEPARATOR) || UNIT_HISTORY_COPY.NO_SPEND;
