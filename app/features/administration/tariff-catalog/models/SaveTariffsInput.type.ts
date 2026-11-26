import type { NullableRef } from "@/app/types";
import type { SaveTariffAmountsInput } from "./SaveTariffAmountsInput.type";

export type SaveTariffsInput = {
  category_id: string;
  rental: NullableRef<SaveTariffAmountsInput>;
  tour: NullableRef<SaveTariffAmountsInput>;
};
