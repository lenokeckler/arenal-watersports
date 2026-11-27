import { EQUIPMENT_CURRENCIES } from "@/app/constants";
import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import { sumJobCost } from "@/app/utils/equipment-stats/sumJobCost";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";

export const buildDayTotals = (
  jobs: EquipmentJob[],
  damages: number
): string =>
  [
    jobs.length
      ? MAINTENANCE_COPY.JOB_COUNT(jobs.length)
      : null,
    damages ? MAINTENANCE_COPY.DAMAGE_COUNT(damages) : null,
    ...EQUIPMENT_CURRENCIES.map((currency) => {
      const amount = sumJobCost(jobs, currency);

      return amount > 0
        ? formatMoney({ amount, currency })
        : null;
    }),
  ]
    .filter(Boolean)
    .join(MAINTENANCE_COPY.PART_SEPARATOR);
