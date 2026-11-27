import type { CurrencyCode } from "@/app/constants/money/CurrencyCode.constants";
import type { NullableRef } from "@/app/types";
import type { EquipmentHubData } from "./EquipmentHubData.interface";

export interface EquipmentHubViewProps {
  currency: CurrencyCode;
  data: NullableRef<EquipmentHubData>;
  errorMessage: NullableRef<string>;
}
