import type { CurrencyCode } from "@/app/constants/money/CurrencyCode.constants";
import type { NullableRef } from "@/app/types";
import type { MaintenanceTab } from "./MaintenanceTab.type";

export interface MaintenanceFilters {
  bar: string;
  currency: CurrencyCode;
  day: string;
  isDayOpen: boolean;
  machineId: NullableRef<string>;
  month: string;
  showAttention: boolean;
  tab: MaintenanceTab;
}
