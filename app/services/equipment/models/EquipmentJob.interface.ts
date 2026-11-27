import type { Database, NullableRef } from "@/app/types";

export interface EquipmentJob {
  costAmount: NullableRef<number>;
  currency: NullableRef<
    Database["public"]["Enums"]["currency_code"]
  >;
  date: string;
  description: NullableRef<string>;
  id: string;
  isExternal: boolean;
  isRetired: boolean;
  unitCode: string;
  unitId: string;
  workType: string;
}
