import type { NullableRef } from "@/app/types";
import type { TariffAmounts } from "./TariffAmounts.interface";

export interface TariffCatalogRow {
  categoryId: string;
  categoryName: string;
  rental: NullableRef<TariffAmounts>;
  tour: NullableRef<TariffAmounts>;
}
