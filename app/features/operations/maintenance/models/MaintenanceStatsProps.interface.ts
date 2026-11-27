import type { CurrencyCode } from "@/app/constants/money/CurrencyCode.constants";
import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";

export interface MaintenanceStatsProps {
  currency: CurrencyCode;
  jobs: EquipmentJob[];
}
