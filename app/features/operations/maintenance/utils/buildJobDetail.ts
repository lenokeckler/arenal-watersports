import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";

export const buildJobDetail = ({
  costAmount,
  currency,
  isExternal,
}: EquipmentJob): string =>
  [
    costAmount !== null && currency
      ? formatMoney({ amount: costAmount, currency })
      : MAINTENANCE_COPY.NO_COST,
    isExternal ? MAINTENANCE_COPY.EXTERNAL : null,
  ]
    .filter(Boolean)
    .join(MAINTENANCE_COPY.PART_SEPARATOR);
