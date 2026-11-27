import type { CurrencyCode } from "@/app/constants/money/CurrencyCode.constants";
import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";

export interface SpendBarsInput {
  currency: CurrencyCode;
  currentMonth: string;
  jobs: EquipmentJob[];
  months: string[];
  resolveHref: (month: string) => string;
}
