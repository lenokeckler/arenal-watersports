import type { CurrencyCode } from "@/app/constants/money/CurrencyCode.constants";
import type { EquipmentHubData } from "./EquipmentHubData.interface";

export interface EquipmentHubSectionProps {
  currency: CurrencyCode;
  data: EquipmentHubData;
}
