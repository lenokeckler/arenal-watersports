import type { NullableRef } from "@/app/types";

export interface DispatchUnitReadingRow {
  code: string;
  fuelError: NullableRef<string>;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  fuelText: string;
  previousFuel: NullableRef<number>;
  unitId: string;
  usageError: NullableRef<string>;
  usageReading: NullableRef<number>;
  usageText: string;
  usageTotal: number;
}
