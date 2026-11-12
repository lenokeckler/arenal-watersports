import type { NullableRef } from "@/app/types";

export interface DispatchUnitReading {
  fuel: NullableRef<number>;
  unitId: string;
  usage: NullableRef<number>;
}
