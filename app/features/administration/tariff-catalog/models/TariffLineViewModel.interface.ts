import type { NullableRef } from "@/app/types";

export interface TariffLineViewModel {
  amounts: string;
  hasTariff: boolean;
  label: string;
  unit: NullableRef<string>;
}
