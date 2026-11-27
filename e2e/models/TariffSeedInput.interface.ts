import type { TariffAmounts } from "@/app/features/administration/tariff-catalog/models/TariffAmounts.interface";
import type { NullableRef } from "@/app/types";

export interface TariffSeedInput {
  rental: NullableRef<TariffAmounts>;
  scenario: string;
  tour: NullableRef<TariffAmounts>;
}
