import type { NullableRef } from "@/app/types";

export interface TariffLineViewModel {
  amounts: string;
  label: string;
  unit: NullableRef<string>;
}
